"""
Main server routes
"""
import json
import os
import requests
from flask import Flask, render_template, request
from api import settings
from api.flaskr.trailheads import HikingApi
from api.flaskr.geocoding import geocode
from api.flaskr.weather import get_current_weather
from api.flaskr.cold_weather import find_closest_station, find_coldest_weather
from api.flaskr.trails import generate_trails
from api.flaskr.elevation import get_elevation, process_elevation
from api.flaskr.join_routes import join_routes, get_distance
from api.settings import GOOGLE_MAPS_API_KEY

app = Flask(__name__)

@app.route('/api/lat-lng')
def lat_lng():
    """
    Geocoding API endpoint
    :return: lat and long given a city name
    """
    city_name = request.args['city_name']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return "Geocoding error", 500
    else:
        lat_lng_dict = { 'lat':lat_lng[0], 'lon':lat_lng[1] }
        return json.dumps(lat_lng_dict)


@app.route('/api/trailheads')
def get_trails():
    """
    Trails list API endpoint
    :return: list of nearby trails to a given lat and lon
    """
    city_name = request.args['city_name']
    max_distance = request.args['distance']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return "Geocoding error", 500
    hiking_api = HikingApi()
    trails = hiking_api.get_trails(lat_lng[0], lat_lng[1], max_distance)
    return json.dumps(trails)

@app.route('/api/trail-coords')
def get_trail_coords():
    """
    Trail coordinates API endpoint
    :return: map of trail names to a list of coordinates
    """
    lat = float(request.args['lat'])
    lon = float(request.args['lon'])
    height_from_center = float(request.args['height_from_center'])
    width_from_center = float(request.args['width_from_center'])
    max_distance = float(request.args['distance'])
    trails = generate_trails(lat, lon, height_from_center, width_from_center, max_distance)
    return json.dumps(trails)

@app.route('/api/weather')
def get_weather():
    """
    Weather API endpoint
    :return: weather forecast for a location given lat and long
    """
    lat = request.args['lat']
    lng = request.args['lng']
    return get_current_weather(lat, lng)

@app.route('/api/coldest-weather')
def get_cold_weather():
    """
    Coldest weather API endpoint
    :return: coldest weather in the past 10 years, adjusted for altitude, for a given lat and long
    """
    FEET_PER_METER = 3.28084
    lat = float(request.args['lat'])
    lng = float(request.args['lng'])
    day = int(request.args['day'])
    month = int(request.args['month'])
    elev = float(request.args['maxElev'])
    closest_station = find_closest_station(lat, lng)
    day_formatted = "{:02d}".format(day)
    month_formatted = "{:02d}".format(month)
    coldest_weather = find_coldest_weather(day_formatted, month_formatted, closest_station['wban'], closest_station['usaf'])
    altitude_adjustment = ((elev-float(closest_station['elevation'])*FEET_PER_METER)/1000)*3.5
    coldest_weather -= altitude_adjustment
    return json.dumps(round(coldest_weather))

@app.route('/api/elevation', methods=['POST'])
def get_elevation_and_compute_route_difficulty():
    """
    API endpoint to get elevation associated with a route and process that information to determine route difficulty
    :return: dictionary containing coordinates with elevation, difficulty, maximum elevation and its location and elevation chart data
    """
    coordinates = request.get_json()['coords']
    if not coordinates:
        return "Empty coordinates list supplied", 400
    coords_with_elevation = get_elevation(coordinates)
    processed_coords = process_elevation(coords_with_elevation)
    return json.dumps(processed_coords)

@app.route('/api/multi-route-elevation', methods=['POST'])
def create_route_and_compute_elevation_and_difficulty():
    '''
    API endpoint to join multiple trails, query Google maps for elevation information and process that information
    :return: dictionary corresponding to the merged route with same structure as get_elevation_and_compute_route_difficulty return value, except with an added 'distance' key
    '''
    routes = request.get_json()['routes']
    if not routes:
        return "Empty route list supplied", 400
    merged_route = join_routes(routes)['coords']
    try:
        coords_with_elevation = get_elevation(merged_route)
    except Exception as e:
        if str(e) == "Trail too long":
            return str(e), 413
        else:
            raise
    processed_coords = process_elevation(coords_with_elevation)
    processed_coords['distance'] = get_distance(merged_route)
    return json.dumps(processed_coords)

@app.route('/api/image-meta-data')
def proxy_image_meta_data():
    lat = request.args['lat']
    lng = request.args['lng']
    location = f"{lat},{lng}"
    endpoint = 'https://maps.googleapis.com/maps/api/streetview/metadata'
    payload = {
        'key': GOOGLE_MAPS_API_KEY,
        'location': location
    }
    return requests.get(endpoint, payload).content

@app.route('/api/image')
def proxy_image_data():
    lat = request.args['lat']
    lng = request.args['lng']
    size = request.args['size']
    fov = request.args['fov']
    location = f"{lat},{lng}"
    endpoint = 'https://maps.googleapis.com/maps/api/streetview'
    payload = {
        'key': GOOGLE_MAPS_API_KEY,
        'location': location,
        'size': size,
        'fov': fov
    }
    return requests.get(endpoint, payload).content

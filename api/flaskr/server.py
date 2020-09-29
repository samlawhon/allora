"""
Main server routes
"""
import json
import os
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from api import settings
from api.flaskr.hiking import HikingApi
from api.flaskr.geocoding_api import geocode
from api.flaskr.weather import get_current_weather
from api.flaskr.cold_weather import find_closest_station, find_coldest_weather
from api.flaskr.geodata import generate_trails
from api.flaskr.elevation import get_elevation, process_elevation
from api.flaskr.join_routes import join_routes, get_distance

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_CONNECTION_STING
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object(__name__)
db = SQLAlchemy(app)
migrate = Migrate(app, db, directory=os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'migrations')))

from api.flaskr.model import TrailModel

@app.route('/lat-lng', methods=['POST'])
def lat_lng():
    """
    Geocoding API endpoint
    :return: lat and long given a city name
    """
    name = request.get_json(force=True)
    city_name = name['city_name']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return "Geocoding error", 500
    else:
        lat_lng_dict = { 'lat':lat_lng[0], 'lon':lat_lng[1] }
        return json.dumps(lat_lng_dict)


@app.route('/trailheads', methods=['POST'])
def get_trails():
    """
    Trails list API endpoint
    :return: list of nearby trails to a given lat and lon
    """
    name_and_distance = request.get_json(force=True)
    city_name = name_and_distance['city_name']
    max_distance = name_and_distance['distance']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return "Geocoding error", 500
    hiking_api = HikingApi()
    trails = hiking_api.get_trails(lat_lng[0], lat_lng[1], max_distance)
    trails_dicts = [trail.as_dict() for trail in trails]
    return json.dumps(trails_dicts)

@app.route('/trail-coords', methods=['POST'])
def get_trail_coords():
    """
    Trail coordinates API endpoint
    :return: map of trail names to a list of coordinates
    """
    payload = request.get_json(force=True)
    lat = payload['lat']
    lon = payload['lon']
    height_from_center = payload['height_from_center']
    width_from_center = payload['width_from_center']
    max_distance = payload['distance']
    trails = generate_trails(lat, lon, height_from_center, width_from_center, max_distance)
    return json.dumps(trails)

@app.route('/weather', methods=['POST'])
def get_weather():
    """
    Weather API endpoint
    :return: weather forecast for a location given lat and long
    """
    lat_and_lng = request.get_json(force=True)
    lat = lat_and_lng['lat']
    lng = lat_and_lng['lng']
    return get_current_weather(lat, lng)

@app.route('/coldest-weather', methods=['POST'])
def get_cold_weather():
    """
    Coldest weather API endpoint
    :return: coldest weather in the past 10 years, adjusted for altitude, for a given lat and long
    """
    FEET_PER_METER = 3.28084
    lat_lng_day_month_maxElev = request.get_json(force=True)
    lat = lat_lng_day_month_maxElev['lat']
    lng = lat_lng_day_month_maxElev['lng']
    day = lat_lng_day_month_maxElev['day']
    month = lat_lng_day_month_maxElev['month']
    elev = lat_lng_day_month_maxElev['maxElev']
    closest_station = find_closest_station(float(lat), float(lng))
    day_formatted = "{:02d}".format(day)
    month_formatted = "{:02d}".format(month)
    coldest_weather = find_coldest_weather(day_formatted, month_formatted, closest_station['wban'], closest_station['usaf'])
    altitude_adjustment = ((float(elev)-float(closest_station['elevation'])*FEET_PER_METER)/1000)*3.5
    coldest_weather -= altitude_adjustment
    return json.dumps(round(coldest_weather))

@app.route('/elevation', methods=['POST'])
def get_elevation_and_compute_route_difficulty():
    """
    API endpoint to get elevation associated with a route and process that information to determine route difficulty
    :return: dictionary containing coordinates with elevation, difficulty, maximum elevation and its location and elevation chart data
    """
    coordinates = request.get_json(force=True)["coords"]
    if not coordinates:
        return "Empty coordinates list supplied", 400
    coords_with_elevation = get_elevation(coordinates)
    processed_coords = process_elevation(coords_with_elevation)
    return json.dumps(processed_coords)

@app.route('/multi-route-elevation', methods=['POST'])
def create_route_and_compute_elevation_and_difficulty():
    '''
    API endpoint to join multiple trails, query Google maps for elevation information and process that information
    :return: dictionary corresponding to the merged route with same structure as get_elevation_and_compute_route_difficulty return value, except with an added 'distance' key
    '''
    routes = request.get_json(force=True)["routes"]
    if not routes:
        return "Empty route list supplied", 400
    merged_route = join_routes(routes)
    try:
        coords_with_elevation = get_elevation(merged_route['coords'])
    except Exception as e:
        if str(e) == "Trail too long":
            return str(e), 413
        else:
            raise
    processed_coords = process_elevation(coords_with_elevation)
    processed_coords['distance'] = get_distance(merged_route['coords'])
    return json.dumps(processed_coords)

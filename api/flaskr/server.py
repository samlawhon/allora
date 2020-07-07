"""
Main server routes
"""
import json
from flask import Flask, render_template, request # pylint: disable=import-error
from api import settings
from api.flaskr.hiking import HikingApi
from api.flaskr.geocoding_api import geocode


app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/lat-lng', methods=['POST'])
def lat_lng():
    name = request.get_json(force=True)
    city_name = name['city_name']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return '500'
    else:
        lat_lng_dict = { 'lat':lat_lng[0], 'lng':lat_lng[1] }
        return json.dumps(lat_lng_dict)


@app.route('/trails', methods=['POST'])
def get_trails():
    """
    Trails list API endpoint
    :return: list of nearby trails to a given lat and long
    """
    coords_and_distance = request.get_json(force=True)
    lat = coords_and_distance['lat']
    lng = coords_and_distance['lng']
    max_distance = coords_and_distance['distance']
    hiking_api = HikingApi()
    trails = hiking_api.get_trails(lat, lng, max_distance)
    trails_dicts = [trail.as_dict() for trail in trails]
    return json.dumps(trails_dicts)

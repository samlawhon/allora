"""
Main server routes
"""
import json
from flask import Flask, render_template, request
from api import settings
from api.flaskr.hiking import HikingApi
from api.flaskr.geocoding_api import geocode


app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def home():
    """
    Default home page
    :return: rendered template
    """
    return render_template('home.html')

@app.route('/trails', methods=['GET'])
def get_trails():
    """
    Trails list API endpoint
    :return: list of nearby trails to a given lat and long
    """
    coords_and_distance = request.get_json(force=True)
    city_name = coords_and_distance['city_name']
    max_distance = coords_and_distance['distance']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return '500'
    hiking_api = HikingApi()
    trails = hiking_api.get_trails(lat_lng[0], lat_lng[1], max_distance)
    trails_dicts = [trail.as_dict() for trail in trails]
    return json.dumps(trails_dicts)

@app.route('/how-it-works')
def how_it_works():
    """
    How it works page
    :return: rendered template
    """
    return render_template('how-it-works.html')


@app.route('/map')
def render_map():
    """
    Rendered map
    :return: rendered template
    """
    return render_template('home.html',
                           OPEN_WEATHER_API_KEY=settings.OPEN_WEATHER_API_KEY)

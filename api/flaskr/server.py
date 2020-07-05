"""
Main server routes
"""
from flask import Flask, render_template, request
from api import settings
from .hiking import HikingApi
from .name_generator import nameofroute
import json
import geopy


app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def home():
    """
    Default home page
    :return: rendered template
    """
    return render_template('home.html')

@app.route('/name')
def name():
    """
    Route Name Gag Api Endpoint
    :return: randomized quote
    """
    return {'name': nameofroute()}

@app.route('/trails', methods=['POST'])
def trails():
    """
    Trails list API endpoint
    :return: list of nearby trails to a given lat and long
    """
    coords_and_distance = request.get_json(force=True)
    lat = coords_and_distance['lat']
    lon = coords_and_distance['lon']
    max_distance = coords_and_distance['distance']
    hikingAPI = HikingApi()
    trails = hikingAPI.get_trails(lat, lon, max_distance)
    trails_dicts = [trail.asDict() for trail in trails]
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

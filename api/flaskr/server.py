"""
Main server routes
"""
import json
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from api import settings
from api.flaskr.hiking import HikingApi
from api.flaskr.geocoding_api import geocode

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = settings.DATABASE_CONNECTION_STING
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config.from_object(__name__)
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from api.flaskr.model import TrailModel

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
    name_and_distance = request.get_json(force=True)
    city_name = name_and_distance['city_name']
    max_distance = name_and_distance['distance']
    lat_lng = geocode(city_name)
    if lat_lng is None:
        return '500'
    hiking_api = HikingApi()
    trails = hiking_api.get_trails(lat_lng[0], lat_lng[1], max_distance)
    trails_dicts = [trail.as_dict() for trail in trails]
    return json.dumps(trails_dicts)

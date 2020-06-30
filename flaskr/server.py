"""
Main server routes
"""
from flask import Flask, render_template
import settings

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def home():
    """
    Default home page
    :return: rendered template
    """
    return render_template('home.html')


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

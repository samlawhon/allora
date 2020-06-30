from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import settings

app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/how-it-works')
def how_it_works():
    return render_template('how-it-works.html')

@app.route('/map')
def map():
    return render_template('home.html',
                           OPEN_WEATHER_API_KEY=settings.OPEN_WEATHER_API_KEY)

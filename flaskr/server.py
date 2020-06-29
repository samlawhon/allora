from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import settings

app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/map')
def map():
    return render_template('hikingApp.html',
                           OPEN_WEATHER_API_KEY=settings.OPEN_WEATHER_API_KEY)

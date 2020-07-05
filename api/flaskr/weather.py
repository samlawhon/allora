import requests
from api.settings import OPEN_WEATHER_API_KEY
import datetime

class WeatherApi:

    ENDPOINT = "https://api.openweathermap.org/data/2.5/"

    def __init__(self, lat, lon, year, month, day):
        self.lat = lat
        self.lon = lon
        self.year = year
        self.month = month
        self.day = day

    # needs to be clarified - open weather key wasn't working, so I haven't tested
    def getCurrentWeather(self):
        current_weather_endpoint = self.ENDPOINT + "weather?"
        payload = {'lat': str(self.lat), 'lon': str(self.lon), 'appid': OPEN_WEATHER_API_KEY}
        response = requests.get(current_weather_endpoint, payload)
        current_weather_data = response.json()
        return current_weather_data['weather']
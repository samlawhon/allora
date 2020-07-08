'''
Module for interacting with the open weather API
'''
import requests # pylint: disable=import-error
from api.settings import OPEN_WEATHER_API_KEY


def get_current_weather(lat, lon):
    '''
    Method for getting weather at a location
    '''
    endpoint = "https://api.openweathermap.org/data/2.5/"
    current_weather_endpoint = endpoint + "onecall?"
    payload = {'lat': str(lat), 'lon': str(lon), 'exclude': "current,minutely,hourly", 'appid': OPEN_WEATHER_API_KEY, 'units':'imperial'}
    response = requests.get(current_weather_endpoint, payload)
    current_weather_data = response.json()
    return current_weather_data
    
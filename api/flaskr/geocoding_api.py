from api.settings import MAPQUEST_API_KEY
import requests
import json

def geocode(city_name):
    url = 'http://open.mapquestapi.com/geocoding/v1/address?key=' + MAPQUEST_API_KEY + '&location=' + city_name
    r = requests.get(url).json()
    return (r['results'][0]['locations'][0]['displayLatLng']['lat'], r['results'][0]['locations'][0]['displayLatLng']['lng'])


print(geocode('Nederland, CO'))

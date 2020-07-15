'''
Helpers for interacting with the geocoding api
'''
import requests
from api.settings import MAPQUEST_API_KEY

def geocode(city_name):
    '''
    Geocode a city name
    '''
    endpoint = 'http://open.mapquestapi.com/geocoding/v1/address'
    payload = {'key': MAPQUEST_API_KEY, 'location': city_name}
    result = requests.get(endpoint, payload).json()
    try:
        return (result['results'][0]['locations'][0]['displayLatLng']['lat'],
                result['results'][0]['locations'][0]['displayLatLng']['lng'])
    except IndexError:
        return None

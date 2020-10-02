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

def reverse_geocode(coords):
    '''
    Reverse geocode coordinates
    '''

    endpoint = 'http://www.mapquestapi.com/geocoding/v1/reverse'

    payload = {'key': MAPQUEST_API_KEY, 'location': f"{coords['lat']},{coords['lng']}"}

    result = requests.get(endpoint, payload).json()
    try:
        locations_details = result['results'][0]['locations'][0]
        street = locations_details['street']
        city = locations_details['adminArea5']
        state = locations_details['adminArea3']
        address = ''
        if street and city and state:
            address = f"{street}, {city}, {state}"
        elif city and state:
            address = f"{city}, {state}"
        else:
            raise Exception('Bad address response')
        return address
    except IndexError:
        return None
        

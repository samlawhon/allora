'''
Module for interacting with the hiking project API
'''
import requests
from api.settings import HIKING_PROJECT_API_KEY
from api.flaskr.hiking_trail import HikingTrail

class HikingApi:
    '''
    Class for interacting with the hiking project API
    '''

    ENDPOINT = 'https://www.hikingproject.com/data/'

    def get_trails(self, lat, lon, max_dist):
        '''
        Function for getting tails near a location
        '''
        trail_endpoint = self.ENDPOINT + 'get-trails'
        payload = {'lat': lat, 'lon': lon, 'maxDistance': max_dist, 'key': HIKING_PROJECT_API_KEY}
        res = requests.get(trail_endpoint, payload)
        trails = res.json()
        return [HikingTrail(**trail) for trail in trails['trails']]

    def get_conditions(self, ids):
        '''
        Function for getting conditions of specified trails
        '''
        condition_endpoint = self.ENDPOINT + 'get-conditions'
        if len(ids) > 0:
            payload = {'ids': ','.join(ids)[0:], 'key': HIKING_PROJECT_API_KEY}
            res = requests.get(condition_endpoint, payload)
            conditions = res.json()
            return conditions
        return None

import json
import requests
from api.settings import HIKING_PROJECT_API_KEY
from api.flaskr.HikingTrail import HikingTrail

class HikingApi:

    ENDPOINT = 'https://www.hikingproject.com/data/'

    def get_trails(self, lat, lon, max_dist):
        trail_endpoint = self.ENDPOINT + 'get-trails'
        payload = {'lat': lat, 'lon': lon, 'maxDistance': max_dist, 'key': HIKING_PROJECT_API_KEY}
        res = requests.get(trail_endpoint, payload)
        trails = res.json()
        return [HikingTrail(**trail) for trail in trails['trails']]

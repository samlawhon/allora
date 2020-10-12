import unittest
import pdb
from api.flaskr.trailheads import HikingApi

class TestTrailheads(unittest.TestCase):

    def test_get_trailheads(self):
        nederland_co_coords = { 'lat': 39.9614, 'lng': -105.5108 }
        hikingapi = HikingApi()
        trailheads = hikingapi.get_trails(nederland_co_coords['lat'], nederland_co_coords['lng'], 10)
        self.assertTrue( isinstance(trailheads, list) )
        first_trail = trailheads[0]
        self.assertTrue('name' in first_trail)
        self.assertTrue('summary' in first_trail)
        self.assertTrue('difficulty' in first_trail)

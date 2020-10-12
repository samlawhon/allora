import unittest
from api.flaskr.great_circle import great_circle

class TestGreatCircle(unittest.TestCase):

    def test_great_circle(self):
        # two points along I-80 in Nebraska
        exit_353 = { 'lat':  40.8211301, 'lng': -97.5961565 }
        exit_332 = { 'lat': 40.8219409, 'lng': -97.9954019 }
        google_maps_distance = 21  # miles per Google maps
        great_circle_distance = great_circle(exit_332['lat'], exit_332['lng'], exit_353['lat'], exit_353['lng'])
        self.assertAlmostEqual(great_circle_distance, google_maps_distance, places=0)
import unittest
from api.flaskr.trails import generate_trails

class TestTrails(unittest.TestCase):

    def test_generate_trails(self):
        nederland_co_coords = { 'lat': 39.9614, 'lng': -105.5108 }
        heigh_from_center = 0.10  # about 14 miles top to bottom
        width_from_center = 0.15  # about 16 miles side to side
        trails = generate_trails(
            nederland_co_coords['lat'], 
            nederland_co_coords['lng'], 
            heigh_from_center, 
            width_from_center, 
            5)
        self.assertTrue('4th of July Road' in trails)
        fourth_of_july_road = trails['4th of July Road']
        self.assertTrue('coords' in fourth_of_july_road)
        self.assertTrue('distance' in fourth_of_july_road)
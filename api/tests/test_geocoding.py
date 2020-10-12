import unittest
from api.flaskr.geocoding import geocode, reverse_geocode

class TestGeocoding(unittest.TestCase):

    def test_geocoding(self):
        lat, lng = geocode('Nederland, CO')
        self.assertAlmostEqual(lat, 39.9614, places=4)  # per Google search for 'Nederland, Co' coords
        self.assertAlmostEqual(lng, -105.5108, places=4)  # per Google search for 'Nederland, Co' coords
    
    def test_reverse_geocoding(self):
        coords = { 'lat': 39.9614, 'lng': -105.5108 }
        address = reverse_geocode(coords)
        self.assertRegex(address, 'Nederland, CO')
import unittest
from api.flaskr.weather import get_current_weather

class TestWeather(unittest.TestCase):

    def test_get_current_weather(self):
        nederland_co_coords = { 'lat': 39.9614, 'lng': -105.5108 }
        current_weather_data = get_current_weather(nederland_co_coords['lat'], nederland_co_coords['lng'])
        self.assertTrue( 'daily' in current_weather_data )
        self.assertEqual(len(current_weather_data['daily']), 8)

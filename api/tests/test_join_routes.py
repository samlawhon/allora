import unittest
from api.flaskr.join_routes import join_routes

class TestJoinRoutes(unittest.TestCase):
    
    def test_join_routes(self):
        # path in Hanover, NH
        path1 = { 'coords': [
            { 'lat': 43.7029493, 'lng': -72.2856270 },
            { 'lat': 43.7030325, 'lng': -72.2847589 }
        ]}
        # disconnected but nearby second path in Hanover, NH
        path2 = { 'coords': [
            { 'lat': 43.7031308, 'lng': -72.2841421 },
            { 'lat': 43.7035184, 'lng': -72.2835178 }
        ]}
        joined_route = join_routes([path1, path2])
        self.assertDictEqual(path1['coords'][0], joined_route['coords'][0])
        self.assertDictEqual(path2['coords'][-1], joined_route['coords'][-1])
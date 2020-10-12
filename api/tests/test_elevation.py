import unittest
import pdb
from api.flaskr.elevation import get_elevation, determine_difficulty, process_elevation, DIFFICULTY_SCALE

class TestElevation(unittest.TestCase):
    
    def test_get_elevation(self):
        nederland_co_coords = { 'lat': 39.9614, 'lng': -105.5108 }
        hanover_nh_coords = { 'lat': 43.7022, 'lng': -72.2896 }
        coords = [nederland_co_coords, hanover_nh_coords]
        coords_with_elevation = get_elevation(coords)
        nederland_elevation = coords_with_elevation[0]['elevation']
        hanover_elevation = coords_with_elevation[1]['elevation']
        self.assertAlmostEqual(nederland_elevation, 2508, delta=5)  # meters, per Google
        self.assertAlmostEqual(hanover_elevation, 161, delta=5)  # meters, per Google

    def test_determine_difficulty(self):
        elevation_increase = 1000  # ft
        distance_increase = 1  # mi
        difficulty = determine_difficulty(elevation_increase, distance_increase)
        self.assertEqual(DIFFICULTY_SCALE[difficulty], 'Very steeply uphill. PROCEED WITH CAUTION')
        
        elevation_increase = 3500  # ft
        distance_increase = 5  # mi
        difficulty = determine_difficulty(elevation_increase, distance_increase)
        self.assertEqual(DIFFICULTY_SCALE[difficulty], 'Steeply uphill')

        elevation_increase = 500  # ft
        distance_increase = 1  # mi
        difficulty = determine_difficulty(elevation_increase, distance_increase)
        self.assertEqual(DIFFICULTY_SCALE[difficulty], 'Moderately uphill')

        elevation_increase = 250  # ft
        distance_increase = 1  # mi
        difficulty = determine_difficulty(elevation_increase, distance_increase)
        self.assertEqual(DIFFICULTY_SCALE[difficulty], 'Lightly uphill')

        elevation_increase = 0  # ft
        distance_increase = 1  # mi
        difficulty = determine_difficulty(elevation_increase, distance_increase)
        self.assertEqual(DIFFICULTY_SCALE[difficulty], 'Flat')

    def test_process_elevation(self):
        coords = [
            { 'location': { 'lat': 43.7022, 'lng': -72.2896 }, 'elevation': 161 },
            { 'location': { 'lat': 39.9614, 'lng': -105.5108 }, 'elevation': 2508 }
        ]
        processed_coords = process_elevation(coords)
        coords_with_distance = processed_coords['coords']
        self.assertAlmostEqual(coords_with_distance[0]['distance'], 0)
        self.assertAlmostEqual(coords_with_distance[1]['distance'], 1718, places=0)  # per independently calculated great circle distance between the two places
        
        difficulty = processed_coords['difficulty']
        self.assertEqual(difficulty, 'Flat')
        
        max_elevation = processed_coords['maximumElevation']  # elevation of Nederland, CO
        self.assertAlmostEqual(max_elevation, 8228, places=0)
        
        max_elevation_coords = processed_coords['maximumElevationCoordinates']  # coordinates of Nederland, CO
        self.assertEqual(max_elevation_coords['lat'], 39.9614)
        self.assertEqual(max_elevation_coords['lng'], -105.5108)
        
        chart_data = processed_coords['chartData']
        self.assertEqual(chart_data[0]['x'], 0)
        self.assertEqual(chart_data[0]['y'], 528)
        self.assertAlmostEqual(chart_data[1]['x'], 1718, places=0)
        self.assertAlmostEqual(chart_data[1]['y'], 8228, places=0)

        trailhead_address = processed_coords['address']
        self.assertRegex(trailhead_address, 'Hanover, NH')

import unittest
from api.flaskr.unit_conversions import meters_to_feet, miles_to_feet

class TestUnitConversions(unittest.TestCase):

    def test_meters_to_feet(self):
        feet = 100
        meters = 30.48
        self.assertAlmostEqual(meters_to_feet(meters), feet, places=2)
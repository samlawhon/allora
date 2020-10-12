import unittest
from api.flaskr.cold_weather import find_closest_station, find_coldest_weather

class TestColdWeather(unittest.TestCase):

    def test_find_closest_station(self):
        closest_station_info = find_closest_station(39.7392, -104.9903)  # Denver, CO, per Google
        wban = closest_station_info['wban']
        usaf = closest_station_info['usaf']
        coldest_weather = find_coldest_weather('08', '09', wban, usaf)
        # weather report on the breaking low temperature of 31 degrees on Tuesday, September 8th, 2020:
        # https://denver.cbslocal.com/2020/09/10/hot-cold-weather-records-denver-6-days-temperatures/
        self.assertAlmostEqual(coldest_weather, 31, delta=1)
        
import requests
import api/settings
import datetime

class WeatherApi:

    def __init__(self, lat, lon, year, month, day):
        self.lat = lat
        self.lon = lon
        self.year = year
        self.month = month
        self.day = day

    def getMinTemp(self):
        response = requests.get("https://history.openweathermap.org/data/2.5/aggregated/year?id=5400075&appid=" + settings.OPEN_WEATHER_API_KEY)
        data = response.json()
        print(data)
            
w = WeatherApi(0, 0, 0, 0, 0)
w.getMinTemp()
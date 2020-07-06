import os
from dotenv import load_dotenv # pylint: disable=import-error

load_dotenv()

OPEN_WEATHER_API_KEY = os.getenv("OPEN_WEATHER_API")
HIKING_PROJECT_API_KEY = os.getenv("HIKING_PROJECT_API")
STRAVA_API_KEY = os.getenv("STRAVA_API")
MAPQUEST_API_KEY = os.getenv("MAPQUEST_API")
GOOGLE_APPLICATION_CREDENTIALS = 'api/GOOGLE_APPLICATION_CREDENTIALS.json'

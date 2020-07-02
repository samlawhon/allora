from dotenv import load_dotenv
import os
load_dotenv()

OPEN_WEATHER_API_KEY = os.getenv("OPEN_WEATHER_API")
HIKING_PROJECT_API_KEY = os.getenv("HIKING_PROJECT_API")
STRAVA_API_KEY = os.getenv("STRAVA_API")

from sys import maxsize
from google.cloud import bigquery
from google.cloud import bigquery
from google.oauth2 import service_account
from api.flaskr.great_circle import great_circle
from datetime import datetime

try:
    credentials = service_account.Credentials.from_service_account_file(
        "GOOGLE_APPLICATION_CREDENTIALS.json",
        scopes=["https://www.googleapis.com/auth/cloud-platform"],
    )

    client = bigquery.Client(
        credentials=credentials,
        project=credentials.project_id,
    )

except FileNotFoundError:
    raise Exception("Error loading Google big query")

def find_closest_station(lat, lon):
    '''
    Finds the closest weather station to the latitude and longitude parameters by querying Google BigQuery,
    if the station has data for 2020 and began recording data on or prior to 2010
    :return: dict containing information about closest weather stations
    '''

    CURRENT_YEAR = datetime.today().year
    YEARS_BACK = 10

    QUERY = (
        'SELECT usaf, wban, begin, `end`, name, lat, lon, elev FROM `bigquery-public-data.noaa_gsod.stations` '
        'WHERE lat BETWEEN {lat}-1 and {lat}+1 '
        'AND lon BETWEEN {lon}-1 and {lon}+1 ')
    query_job = client.query(QUERY.format(lat=lat, lon=lon))  # API request
    rows = query_job.result()  # Waits for query to finish

    closest = " "
    closest_wban = 0
    closest_usaf = 0
    closest_lat = -1
    closest_lon = -1
    closest_elev = -1
    closest_dist = maxsize
    
    for row in rows:
        current_lat = row.lat
        current_lon = row.lon
        current_dist = great_circle(lat, lon, current_lat, current_lon)
        if current_dist < closest_dist and int(row.end[0:4]) == CURRENT_YEAR and int(row.begin[0:4]) <= CURRENT_YEAR - YEARS_BACK:
            closest = row.name
            closest_wban = row.wban
            closest_usaf = row.usaf
            closest_lat = row.lat
            closest_lon = row.lon
            closest_elev = row.elev
            closest_dist = current_dist
    
    return {
        'name': closest, 
        'wban': closest_wban, 
        'usaf':closest_usaf, 
        'latitude': closest_lat, 
        'longitude':closest_lon, 
        'elevation':closest_elev, 
        'distance':closest_dist
    }

def find_coldest_weather(day, month, wban, usaf):
    '''
    Finds the coldest weather recorded in the past 10 years at the given weather station on the given day
    :return: coldest weather in fahrenheit
    '''

    CURRENT_YEAR = datetime.today().year
    YEARS_BACK = 10

    query = "SELECT MIN(min), FROM ( "

    def generate_row(year_diff):
        return (
            "SELECT stn, min "
            f'FROM `bigquery-public-data.noaa_gsod.gsod{CURRENT_YEAR - year_diff}`' 
            f'where da="{day}" and mo="{month}" and wban="{wban}" and stn="{usaf}"'
        )

    sql_rows = map(generate_row, list(range(YEARS_BACK + 1)))

    query += " UNION ALL ".join(sql_rows) + " )"

    query_job = client.query(query)  # API request
    rows = query_job.result()  # Waits for query to finish
    for row in rows:
        return row.f0_

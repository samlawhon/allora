import math
from google.cloud import bigquery
from google.cloud import bigquery
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(
    "GOOGLE_APPLICATION_CREDENTIALS.json",
    scopes=["https://www.googleapis.com/auth/cloud-platform"],
)

client = bigquery.Client(
    credentials=credentials,
    project=credentials.project_id,
)

def calculate_distance(x1, y1, x2, y2):
    return math.sqrt((x2-x1)**2+(y2-y1)**2)

def find_closest_station(lat, lon):

    QUERY = (
        'SELECT usaf, wban, begin, `end`, name, lat, lon, elev FROM `bigquery-public-data.noaa_gsod.stations` '
        'WHERE lat>{lat}-1 '
        'AND lat<{lat}+1 '
        'AND lon>{lon}-1 '
        'AND lon<{lon}+1 ')
    query_job = client.query(QUERY.format(lat=lat, lon=lon))  # API request
    rows = query_job.result()  # Waits for query to finish

    closest = " "
    closest_wban = 0
    closest_usaf = 0
    closest_lat = -1
    closest_lon = -1
    closest_elev = -1
    closest_dist = 100000000
    for row in rows:
        current_lat = row.lat
        current_lon = row.lon
        current_dist = calculate_distance(lat, lon, current_lat, current_lon)
        if (current_dist<closest_dist and int(row.end[0:4])==2020 and int(row.begin[0:4])<=2010):
            closest = row.name
            closest_wban = row.wban
            closest_usaf = row.usaf
            closest_lat = row.lat
            closest_lon = row.lon
            closest_elev = row.elev
            closest_dist = current_dist
    return {'name': closest, 'wban': closest_wban, 'usaf':closest_usaf, 'latitude': closest_lat, 
    'longitude':closest_lon, 'elevation':closest_elev, 'distance':closest_dist}

print(find_closest_station(39.9614, -105.5108))
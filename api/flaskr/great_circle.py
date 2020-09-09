from math import radians, degrees, sin, cos, asin, acos, sqrt

def great_circle(lat1, lon1, lat2, lon2):
    """
    Calculates distance between two points on the surface of the earth.
    :return: distance in miles between two points.
    """
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    MILES_CONSTANT = 3958.756
    return MILES_CONSTANT * (acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon1 - lon2)))

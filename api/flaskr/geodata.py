import overpy
from math import radians, degrees, sin, cos, asin, acos, sqrt

def great_circle(lat1, lon1, lat2, lon2):
    """
    Calculates distance between two points on the surface of the earth.
    :return: distance in miles between two points.
    """
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])
    MILES_CONSTANT = 3958.756
    return MILES_CONSTANT * (acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(lon1 - lon2)))

def generate_trails(lat, lon, height_from_center, width_from_center):
    """
    Generates a dictionary of trails by querying Open Street Map for all named paths in the area.
    :return: dictionary structured as { trail name: [tuples of coordinates] }
    """
    # generate bounding box edges, per Overpass API custom query language
    southern_edge = lat - height_from_center
    western_edge = lon - width_from_center
    northern_edge = lat + height_from_center
    eastern_edge = lon + width_from_center

    api = overpy.Overpass()

    # fetch all named paths in the specified bounding box
    results = api.query(f"""
        way({southern_edge},{western_edge},{northern_edge},{eastern_edge})[highway=path];
        (._;>;);
        out geom;
        """)

    trails = {}

    unnamed = 1

    for way in results.ways:
        coords_list = []
        prev_node = None
        distance = 0
        for node in way.nodes:
            coords = {"lat": float(node.lat), "lng": float(node.lon)}
            coords_list.append(coords)
            if prev_node:
                distance += great_circle(prev_node.lat, prev_node.lon, node.lat, node.lon)
            prev_node = node
        if distance < 0.5:
            continue
        name = way.tags.get('name')
        if not name or name in trails:
            name = f'unnamed {unnamed}'
            unnamed += 1
        trails[name] = {"coords": coords_list, "distance": distance}
    
    return trails

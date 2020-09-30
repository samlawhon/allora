from api.flaskr.great_circle import great_circle
from api.flaskr.elevation import generate_coords
from sys import maxsize
from queue import PriorityQueue

def process_routes_from_params(routes_string):
    routes = routes_string.split('r')
    for i, route in enumerate(routes):
        if not route:
            del routes[i]
            continue
        routes[i] = generate_coords(route)
    return routes

def join_routes(routes_string):
    '''
    Joins a list of routes into one route, via a greedy approach. 
    The algorithms finds two endpoints (on two different routes) such that the distance between those two
    endpoints is the smallest possible distance between any two endoints on different routes in the list.
    Those two routes are then joined. The process is repeated until there is only one route left in the 
    list of routes.
    :return: a merged route
    '''
    routes = process_routes_from_params(routes_string)

    while len(routes) > 1:

        joining_scheme, min_between_routes = get_closest_routes(routes)
        
        route1, route2 = min_between_routes
        
        merged_route_coords = []

        if joining_scheme == 'start1-start2':
            route1.reverse()
            merged_route_coords = route1 + route2
        elif joining_scheme == 'start1-end2':
            merged_route_coords = route2 + route1
        elif joining_scheme == 'end1-start2':
            merged_route_coords = route1 + route2
        else:  # end1-end2
            route2.reverse()
            merged_route_coords = route1 + route2
        
        routes.append(merged_route_coords)
        routes.remove(route1)
        routes.remove(route2)
    
    merged_route = routes[0]

    return merged_route


def get_closest_routes(routes):
    '''
    Analyzes the routes list to find the closest two endpoints between different routes in the routes list
    :return: the joining scheme and the minimum distance of the closest two routes in the list
    '''
    min_between = maxsize
    min_between_routes = []
    min_between_joining_scheme = ''

    for i, route1 in enumerate(routes):
        
        start1 = route1[0]
        end1 = route1[-1]

        for j, route2 in enumerate(routes):

            if i == j:
                continue

            start2 = route2[0]
            end2 = route2[-1]

            local_min_distance, joining_scheme = get_min_joining_scheme(start1, end1, start2, end2)

            if local_min_distance < min_between:
                min_between = local_min_distance
                min_between_routes = [route1, route2]
                min_between_joining_scheme = joining_scheme
    
    return min_between_joining_scheme, min_between_routes


def get_min_joining_scheme(start1_coords, end1_coords, start2_coords, end2_coords):
    '''
    Analyzes the start and ends of trails 1 and 2 to determine the minimum distance between any two endpoints on different trails.
    :return: the minimum distance between any two endoints on different trails and those endpoints
    '''
    distance_start1_start2 = great_circle(start1_coords['lat'], start1_coords['lng'], start2_coords['lat'], start2_coords['lng'])
    distance_start1_end2 = great_circle(start1_coords['lat'], start1_coords['lng'], end2_coords['lat'], end2_coords['lng'])
    distance_end1_start2 = great_circle(end1_coords['lat'], end1_coords['lng'], start2_coords['lat'], start2_coords['lng'])
    distance_end1_end2 = great_circle(end1_coords['lat'], end1_coords['lng'], end2_coords['lat'], end2_coords['lng'])

    connection_distances = PriorityQueue()
    connection_distances.put( (distance_start1_start2,  'start1-start2') )
    connection_distances.put( (distance_start1_end2,  'start1-end2') )
    connection_distances.put( (distance_end1_start2,  'end1-start2') )
    connection_distances.put( (distance_end1_end2,  'end1-end2') )

    return connection_distances.get()

def get_distance(route):
    '''
    Processes a route and returns its length in miles
    :return: sum of the miles between successive pairs of coordinates in the route
    '''
    distance = 0
    prev = route[0]
    for coord in route[1:]:
        distance += great_circle(coord['lat'], coord['lng'], prev['lat'], prev['lng'])
        prev = coord
    return distance

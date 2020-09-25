from api.flaskr.great_circle import great_circle
from sys import maxsize
from queue import PriorityQueue

def join_routes(routes):
    '''
    Joins a list of routes into one route, via a greedy approach. 
    The algorithms finds two endpoints (on two different routes) such that the distance between those two
    endpoints is the smallest possible distance between any two endoints on different routes in the list.
    Those two routes are then joined. The process is repeated until there is only one route left in the 
    list of routes.
    :return: a merged route
    '''

    if not routes:
        raise Exception("join routes function received a list with no routes")
    
    while len(routes) > 1:
        
        min_between = maxsize
        min_between_routes = []
        min_between_joining_scheme = ''
        
        for i, route1 in enumerate(routes):

            start1 = route1['coords'][0]
            end1 = route1['coords'][-1]

            for j, route2 in enumerate(routes):

                if i == j:
                    continue

                start2 = route2['coords'][0]
                end2 = route2['coords'][-1]

                distance_start1_start2 = great_circle(start1['lat'], start1['lng'], start2['lat'], start2['lng'])
                distance_start1_end2 = great_circle(start1['lat'], start1['lng'], end2['lat'], end2['lng'])
                distance_end1_start2 = great_circle(end1['lat'], end1['lng'], start2['lat'], start2['lng'])
                distance_end1_end2 = great_circle(end1['lat'], end1['lng'], end2['lat'], end2['lng'])

                connection_distances = PriorityQueue()
                connection_distances.put( (distance_start1_start2,  'start1-start2') )
                connection_distances.put( (distance_start1_end2,  'start1-end2') )
                connection_distances.put( (distance_end1_start2,  'end1-start2') )
                connection_distances.put( (distance_end1_end2,  'end1-end2') )
                
                local_min_distance, joining_scheme = connection_distances.get()

                if local_min_distance < min_between:
                    min_between = local_min_distance
                    min_between_routes = [route1, route2]
                    min_between_joining_scheme = joining_scheme

        route1, route2 = min_between_routes
        route1_coords, route2_coords = route1['coords'], route2['coords']
        merged_route_coords = []

        if min_between_joining_scheme == 'start1-start2':
            route1_coords.reverse()
            merged_route_coords = route1_coords + route2_coords
        elif min_between_joining_scheme == 'start1-end2':
            merged_route_coords = route2_coords + route1_coords
        elif min_between_joining_scheme == 'end1-start2':
            merged_route_coords = route1_coords + route2_coords
        else:  # end1-end2
            route2_coords.reverse()
            merged_route_coords = route1_coords + route2_coords
        
        routes.append({'coords': merged_route_coords})
        routes.remove(route1)
        routes.remove(route2)
    
    merged_route = routes[0]

    return merged_route

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

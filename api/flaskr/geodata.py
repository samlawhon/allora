import overpy

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
        way({southern_edge},{western_edge},{northern_edge},{eastern_edge})[highway=path][name~\".\"];
        (._;>;);
        out;
        """)

    output = {}

    for way in results.ways:
        node_list = []
        for node in way.nodes:
            node_list.append((node.lat, node.lon))
        output[way.tags.get('name')] = node_list
    
    return output

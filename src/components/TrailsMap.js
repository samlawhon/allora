import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';
import { Path } from 'leaflet';

class TrailsMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            latLng: null
        }
    }

    addTrailMarkers = ({image, maxElev, name, lat, lng}) => (
        <Marker position={[lat, lng]} data-img_link={image} data-name={name} data-maxelev={maxElev} 
        data-lat={lat} data-lng={lng} onClick={this.props.handleRouteSelect}>
            <Popup>
               {name}
            </Popup>
        </Marker>   
       )

    getLatLng() {
        const data = {
            city_name: this.props.location,
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        }

        fetch('/lat-lng', requestOptions).then(response => response.json()).then(data => this.setState({latLng: data}));
    }
    
    componentDidMount() {
        this.getLatLng();
    }

    render() {
        if (this.state.latLng!=null && this.props.trails!==null && this.state.latLng['lat']!==undefined && this.state.latLng['lng']!==undefined) {
            const lat = this.state.latLng['lat'];
            const lng = this.state.latLng['lng'];
            return (
                <div>
                    <LeafletMap
                        center={[lat, lng]}
                        zoom={10}
                        maxZoom={20}
                        attributionControl={true}
                        zoomControl={false}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                    >
                        <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                        <TileLayer
                        url='http://ows.mundialis.de/services/service?'
                        layers='TOPO-OSM-WMS'
                        />
                        <Marker position={[lat, lng]}>
                        <Popup>
                            Home!
                        </Popup>
                        </Marker>
                        {this.props.trails.map(this.addTrailMarkers)}
                    </LeafletMap>
                </div>
            );
        }
        else {
            return (
                <LeafletMap
                        center={[40, -100]}
                        zoom={3}
                        maxZoom={20}
                        attributionControl={true}
                        zoomControl={false}
                        doubleClickZoom={true}
                        scrollWheelZoom={true}
                        dragging={true}
                        animate={true}
                        easeLinearity={0.35}
                        className="m-4"
                    >
                        <TileLayer
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                        />
                    </LeafletMap>
            );
        }
    }
}

export default TrailsMap

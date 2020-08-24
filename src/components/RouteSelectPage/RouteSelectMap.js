import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './RouteSelectMap.css';

class RouteSelectMap extends Component {

    render() {
        const lat = this.props.lat;
        const lng = this.props.lng;
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
                    className="trail-map"
                >
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <Marker position={[lat, lng]}>
                    <Popup>
                        Trail Here!
                    </Popup>
                    </Marker>
                </LeafletMap>
            </div>
        );
        
    }
}

export default RouteSelectMap

import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import './Map.css';

const addTrailMarkers = ({name, latitude, longitude}) => (
     <Marker position={[latitude, longitude]}>
         <Popup>
            {name}
         </Popup>
     </Marker>   
    )

class Map extends Component {

    render() {
        if (this.props.latLng!=null && this.props.trails!=null) {
            const lat = this.props.latLng['lat'];
            const lng = this.props.latLng['lng'];
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
                        <Marker position={[lat, lng]}>
                        <Popup>
                            Home!
                        </Popup>
                        </Marker>
                        {this.props.trails.map(addTrailMarkers)}
                    </LeafletMap>
                </div>
            );
        }
        else {
            return (
                <p>Map loading...</p>
            );
        }
    }
}

export default Map

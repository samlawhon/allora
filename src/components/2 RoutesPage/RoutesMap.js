import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import './RoutesMap.css';

class RoutesMap extends Component {

    // addTrailMarkers = ({image, maxElev, name, lat, lng}) => (
    //     <Marker position={[lat, lng]} data-img_link={image} data-name={name} data-maxelev={maxElev} 
    //     data-lat={lat} data-lng={lng} onClick={this.props.handleRouteSelect}>
    //         <Popup>
    //            {name}
    //         </Popup>
    //     </Marker>   
    // )

    addRoutes = (routeName) => (
        <Polyline color="blue" positions={this.props.trailCoords[routeName]}>
            <Popup>
                {routeName}
            </Popup>
        </Polyline>
    )

    render() {
        if (this.props.coords!==null && this.props.trailCoords!==null && this.props.trails!==null) {
            const lat = this.props.coords['lat'];
            const lon = this.props.coords['lon'];
            console.log(Object.keys(this.props.trailCoords).map(this.addRoutes));
            return (
                <div>
                    <LeafletMap
                        center={[lat, lon]}
                        zoom={11}
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
                        <Marker position={[lat, lon]}>
                        <Popup>
                            Home!
                        </Popup>
                        </Marker>
                        {Object.keys(this.props.trailCoords).map(this.addRoutes)}
                        {/* {this.props.trails.map(this.addTrailMarkers)} */}
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

export default RoutesMap

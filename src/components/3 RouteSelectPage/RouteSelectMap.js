import React from 'react'
import { Map as LeafletMap, TileLayer, Polyline, Popup } from 'react-leaflet';
import './RouteSelectMap.css';

const RouteSelectMap = props => {

    const createMap = (lat, lng) => (
        <LeafletMap
        center={[lat, lng]}
        zoom={12}
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
            url={'https://api.mapbox.com/styles/v1/samlawhon/ckemud3i82mxx19k20rt83av2/tiles/256/{z}/{x}/{y}@2x?access_token='+String(process.env.REACT_APP_MAPBOX_API_KEY)}
            attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
            />
            <Polyline
            weight="4" 
            color="#e55934" 
            onmouseover={(event) => {event.target.setStyle({weight: 6})}} 
            onmouseout={(event) => {event.target.setStyle({weight: 3})}}
            positions={props.selectedRoute.coords}
            >
                <Popup>
                    <h3>{props.selectedRoute.name}</h3>
                    <h5>{props.selectedRoute.distance.toFixed(2) + " miles"}</h5>
                </Popup>
            </Polyline>
        </LeafletMap>
    );
    
    let map = <p>Map loading</p>
    if (props.selectedRoute) {
        const coordsLen = props.selectedRoute.coords.length
        const { lat, lng } = props.selectedRoute.coords[coordsLen - 1];
        map = createMap(lat, lng);
    }
    return map;
}

export default RouteSelectMap

import React, { useState } from 'react'
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import Route from './Route';
import './RoutesMap.css';
import DrawingTools from './DrawingTools';
import DefaultMap from './DefaultMap';
import MapMenu from './MapMenu';

const RoutesMap = props => {

    const [mapViewport, setMapViewport] = useState(null);
    const [creatingMode, setCreatingMode] = useState(false);
    const [highlightedRoutes, setHighlightedRoutes] = useState( new Set() );
    const [drawnRoutes, setDrawnRoutes] = useState( {} );

    if ( !props.coords || !props.trailCoords ) {
        return <DefaultMap />
    }

    const { lat, lon } = props.coords;
    
    // create a marker showing the trailhead if the user has selected a trailhead
    const marker = props.marker ? <Marker position={[props.marker.lat, props.marker.lon]}></Marker> : null;

    // renders a list of Route components
    const routes = Object.keys(props.trailCoords).map(routeName => (
        <Route
        key={routeName}
        name={routeName}
        distance={props.trailCoords[routeName].distance}
        positions={props.trailCoords[routeName].coords}
        creatingMode={creatingMode}
        highlightedRoutes={highlightedRoutes}
        setHighlightedRoutes={setHighlightedRoutes}
        handleRouteSelect={props.handleRouteSelect}
        />
    ));
    
    // drawing tools are rendered if the user is in creating mode, otherwise not
    const openDrawingTools = (
        <DrawingTools
        drawnRoutes={drawnRoutes}
        updateDrawnRoutes={replacement => setDrawnRoutes(replacement)}
        />
    );
    const drawingTools = creatingMode ? openDrawingTools : null;

    return (
        <div>
            <MapMenu
            highlightedRoutes={highlightedRoutes}
            handleJoinedRouteSelect={props.handleJoinedRouteSelect}
            drawnRoutes={drawnRoutes}
            trailCoords={props.trailCoords}
            creatingMode={creatingMode}
            setCreatingMode={setCreatingMode}
            setHighlightedRoutes={setHighlightedRoutes}
            resetTrailCoords={props.resetTrailCoords}
            viewport={mapViewport}
            />
            <LeafletMap
            center={[lat, lon]}
            zoom={props.mapZoom}
            maxZoom={20}
            attributionControl={true}
            zoomControl={false}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
            onViewportChange={viewport => {
                setMapViewport({
                    lat: viewport.center[0],
                    lon: viewport.center[1],
                    zoom: viewport.zoom
                });
            }}
            >
                <TileLayer
                url={'https://api.mapbox.com/styles/v1/samlawhon/ckemud3i82mxx19k20rt83av2/tiles/256/{z}/{x}/{y}@2x?access_token='+String(process.env.REACT_APP_MAPBOX_API_KEY)}
                attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
                />
                {routes}
                {marker}
                {drawingTools}
            </LeafletMap>
        </div>
    );
}

export default RoutesMap

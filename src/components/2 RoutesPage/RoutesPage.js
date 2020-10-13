import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RoutesList from './RoutesList';
import RoutesMap from './RoutesMap';
import './RoutesMap.css';

const RoutesPage = props => {

    const [coords, setCoords] = useState({lat: null, lon: null});
    const [trailheads, setTrailheads] = useState(null);
    const [trailCoords, setTrailCoords] = useState(null);
    const [mapZoom, setMapZoom] = useState(12);
    const [marker, setMarker] = useState(null);

    const HEIGHT_FROM_CENTER = 0.10        // represents about 14 miles from top to bottom
    const WIDTH_FROM_CENTER = 0.15;        // represents about 16 miles from side to side

    const handleTrailheadSelect = event => {
        const newCoords = {
            lat: Number(event.currentTarget.dataset.lat),
            lon: Number(event.currentTarget.dataset.lng)
        }
        const newViewport = {
            ...newCoords,
            zoom: mapZoom
        }
        resetTrailCoords(newViewport);
        setCoords(newCoords);
        setMarker(newCoords);
    }

    const getTrailheads = useCallback(() => {

        const payload = new URLSearchParams({ city_name: props.location, distance: 30 });
        fetch(`/api/trailheads?${payload}`).then(response => response.json()).then(trailHeads => setTrailheads(trailHeads));

    }, [props.location]);

    const getTrailCoords = useCallback( (lat, lon) => {
        const params = {
            lat: lat,
            lon: lon,
            height_from_center: HEIGHT_FROM_CENTER,
            width_from_center: WIDTH_FROM_CENTER,
            distance: props.maxDistance
        }

        const payload = new URLSearchParams(params);

        fetch(`/api/trail-coords?${payload}`).then(response => response.json()).then(trailCoords => setTrailCoords(trailCoords));
    }, [props.maxDistance]);

    const getLocationCoords = useCallback(() => {

        const payload = new URLSearchParams({ city_name: props.location });

        fetch(`/api/lat-lng?${payload}`).then(response => response.json()).then(coords => {
            setCoords(coords);
            getTrailCoords(coords.lat, coords.lon)
        });
    }, [props.location, getTrailCoords]);

    const resetTrailCoords = viewport => {
        if (!viewport) {
            return
        }
        
        setCoords({lat: viewport.lat, lon: viewport.lon});
        setMapZoom(viewport.zoom);
        
        const params = {
            lat: viewport.lat,
            lon: viewport.lon,
            height_from_center: HEIGHT_FROM_CENTER,
            width_from_center: WIDTH_FROM_CENTER,
            distance: props.maxDistance
        }

        const payload = new URLSearchParams(params);

        fetch(`/api/trail-coords?${payload}`).then(response => response.json()).then(trailCoords => setTrailCoords(trailCoords));
    }

    useEffect(() => {
        getLocationCoords();
        getTrailheads();
    }, [getLocationCoords, getTrailheads]);

    return (
        <Container className="pt-4 pb-4" id="routes-page">
            <h1 className="display-3 font-weight-bold routes-map-header">Choose your trail</h1>
            <br/>
            <Row>
                <Col sm="12" lg="8">
                    <RoutesMap 
                    location={props.location} 
                    handleRouteSelect={props.handleRouteSelect}
                    resetTrailCoords={resetTrailCoords} 
                    trailCoords={trailCoords}
                    coords={coords}
                    mapZoom={mapZoom}
                    marker={marker}
                    handleJoinedRouteSelect={props.handleJoinedRouteSelect}
                    />
                </Col>
                <Col sm="12" lg="4">
                    <h4>Popular trail heads on Hiking Project</h4>
                    <div className="routesList">
                        <RoutesList 
                        trailheads={trailheads}
                        handleRouteSelect={props.handleRouteSelect}
                        handleTrailheadSelect={handleTrailheadSelect}
                        />
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default RoutesPage;

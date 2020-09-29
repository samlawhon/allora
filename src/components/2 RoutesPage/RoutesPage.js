import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import RoutesList from './RoutesList';
import RoutesMap from './RoutesMap';
import './RoutesMap.css';

class RoutesPage extends Component {

    constructor(props) {
        super(props);

        this.resetTrailCoords = this.resetTrailCoords.bind(this);
        this.handleTrailheadSelect = this.handleTrailheadSelect.bind(this);

        this.HEIGHT_FROM_CENTER = 0.10;       // represents about 14 miles from top to bottom
        this.WIDTH_FROM_CENTER = 0.15;        // represents about 16 miles from side to side

        this.state = {
            coords: {
                lat: null,
                lon: null
            },
            trailheads: null,
            trailCoords: null,
            mapZoom: 12,
            marker: null
        }
    }

    handleTrailheadSelect(event) {
        let newViewport = {
            lat: Number(event.currentTarget.dataset.lat),
            lon: Number(event.currentTarget.dataset.lng),
            zoom: this.state.mapZoom
        }
        this.resetTrailCoords(newViewport);
        this.setState({
            coords: {
                lat: Number(event.currentTarget.dataset.lat),
                lon: Number(event.currentTarget.dataset.lng)
            },
            marker: {
                lat: Number(event.currentTarget.dataset.lat),
                lon: Number(event.currentTarget.dataset.lng)
            }
        });
    }

    getTrailheads() {
        const data = {
            city_name: this.props.location,
            distance: 30
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        
        }

        fetch('/trailheads', requestOptions).then(response => response.json()).then(data => this.setState({trailheads: data}));
    }

    getLocationCoords() {
        const payload = {
            city_name: this.props.location
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }

        fetch('/lat-lng', requestOptions).then(response => response.json()).then(data => this.setState({coords: data})).then(() => this.getTrailCoords());
    }

    getTrailCoords() {
        const payload = {
            lat: this.state.coords.lat,
            lon: this.state.coords.lon,
            height_from_center: this.HEIGHT_FROM_CENTER,
            width_from_center: this.WIDTH_FROM_CENTER,
            distance: this.props.maxDistance
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        fetch('/trail-coords', requestOptions).then(response => response.json()).then(data => this.setState({trailCoords: data}));
    }

    resetTrailCoords(viewport) {
        if (!viewport) {
            return
        }
        this.setState({
            coords: {
                lat: viewport.lat,
                lon: viewport.lon
            },
            mapZoom: viewport.zoom
        });
        const payload = {
            lat: viewport.lat,
            lon: viewport.lon,
            height_from_center: this.HEIGHT_FROM_CENTER,
            width_from_center: this.WIDTH_FROM_CENTER,
            distance: this.props.maxDistance
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        fetch('/trail-coords', requestOptions).then(response => response.json()).then(data => this.setState({trailCoords: data}));
    }

    componentDidMount() {
        this.getLocationCoords();
        this.getTrailheads();
    }

    render() {
        return (
            <Container className="pt-4 pb-4" id="routes-page">
                <h1 className="display-3 font-weight-bold routes-map-header">Choose your trail</h1>
                <br/>
                <Row>
                    <Col sm="12" lg="8">
                        <RoutesMap 
                        location={this.props.location} 
                        handleRouteSelect={this.props.handleRouteSelect}
                        resetTrailCoords={this.resetTrailCoords} 
                        trailCoords={this.state.trailCoords}
                        coords={this.state.coords}
                        mapZoom={this.state.mapZoom}
                        marker={this.state.marker}
                        handleJoinedRouteSelect={this.props.handleJoinedRouteSelect}
                        />
                    </Col>
                    <Col sm="12" lg="4">
                        <h4>Popular trail heads on Hiking Project</h4>
                        <div className="routesList">
                            <RoutesList 
                            trailheads={this.state.trailheads}
                            handleRouteSelect={this.props.handleRouteSelect}
                            handleTrailheadSelect={this.handleTrailheadSelect}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RoutesPage;

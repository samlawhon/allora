import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import RoutesList from './RoutesList';
import RoutesMap from './RoutesMap';
import './RoutesMap.css';

class RoutesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            coords: {
                lat: null,
                lon: null
            },
            trails: null,
            trailCoords: null
        }
    }

    getTrails() {
        const data = {
            city_name: this.props.location,
            distance: 30
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        
        }

        fetch('/trails', requestOptions).then(response => response.json()).then(data => this.setState({trails: data}));
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
            height_from_center: 0.08339811181,
            width_from_center: 0.1357841492
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        fetch('/trail-coords', requestOptions).then(response => response.json()).then(data => this.setState({trailCoords: data}));
    }

    componentDidMount() {
        this.getTrails();
        this.getLocationCoords();
    }

    render() {
        console.log(this.state.trailCoords);
        console.log(this.state.trails);
        return (
            <Container className="pt-4 pb-4">
                <h1 className="display-3 font-weight-bold routes-map-header">Choose your trail</h1>
                <br/>
                <Row>
                    <Col sm="12" lg="6">
                        <RoutesMap 
                            location={this.props.location} 
                            handleRouteSelect={this.props.handleRouteSelect} 
                            trails={this.state.trails} 
                            trailCoords={this.state.trailCoords}
                            coords={this.state.coords}
                            />
                    </Col>
                    <Col sm="12" lg="6">
                        <div className="routesList">
                            <RoutesList trails={this.state.trails} handleRouteSelect={this.props.handleRouteSelect}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RoutesPage;

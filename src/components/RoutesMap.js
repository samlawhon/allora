import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Routes from './Routes';
import TrailsMap from './TrailsMap';
import './RoutesMap.css';

class RoutesMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latLng: null,
            trails: null
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

    componentDidMount() {
        this.getTrails();
    }

    render() {
        return (
            <Container className="pt-4 pb-4">
                <h1 className="display-3 font-weight-bold routes-map-header pt-2 pb-2">Choose your trail</h1>
                <Row>
                    <Col sm="12" lg="6">
                        <TrailsMap location={this.props.location} handleRouteSelect={this.props.handleRouteSelect} trails={this.state.trails}/>
                    </Col>
                    <Col sm="12" lg="6">
                        <div className="routesList">
                            <Routes trails={this.state.trails} handleRouteSelect={this.props.handleRouteSelect}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RoutesMap;

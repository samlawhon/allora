import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Routes from './Routes'
import Map from './Map'
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
        this.getTrails();
        this.getLatLng();
    }

    render() {

        return (
            <Container className="pt-4 pb-4">
                <Row>
                    <Col sm="12" md="8">
                        <Map latLng={this.state.latLng} trails={this.state.trails}/>
                    </Col>
                    <Col sm="12" md="4">
                        <div className="routesList">
                            <Routes trails={this.state.trails}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default RoutesMap;

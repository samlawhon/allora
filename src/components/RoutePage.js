import React, { Component } from 'react';
import './RoutePage.css';
import { Container, Row, Col } from 'reactstrap';
import './TrailMap';
import TrailMap from './TrailMap';
import Forecast from './Forecast';
import BadWeatherCase from './BadWeatherCase';

class RoutePage extends Component {
    
    constructor(props) {
        super(props);
    }
    
    day() {
        const d = new Date();
        const da = d.getDate();
        return da;
    }

    month() {
        const d = new Date();
        const mo = d.getMonth();
        return mo+1;
    }

    render() {
        return (
            <Container>
                <div className="RoutePageHeadings pt-4 pb-4">
                    <h1 className="display-4 font-weight-bold">{this.props.route.name}</h1>
                </div>
                <Row className="mb-3">
                    <Col sm="12" md="6">
                        <img className="img-fluid route-image" src={this.props.route.img_link}/>
                    </Col>
                    <Col sm="12" md="6">
                        <TrailMap lat={this.props.route.lat} lng={this.props.route.lng}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm="12">
                        <h1 className="RoutePageHeadings pt-4 pb-4 font-weight-bold">Weather</h1>
                        <Row>
                            <Col sm="12" md="6">
                                <h3 className="RoutePageSubHeadings pb-2">Forecast</h3>
                                <Forecast lat={this.props.route.lat} lng={this.props.route.lng}/>
                            </Col>
                            <Col sm="12" md="6">
                                <h3 className="RoutePageSubHeadings pb-2">Realistic Bad Weather Case</h3>
                                <BadWeatherCase lat={this.props.route.lat} lng={this.props.route.lng} day={this.day()} month={this.month()} maxElev={this.props.route.maxElev}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
            </Container>
        );
    }
    
}

export default RoutePage;
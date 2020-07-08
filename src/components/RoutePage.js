import React, { Component } from 'react';
import './RoutePage.css';
import { Container, Row, Col } from 'reactstrap';
import './TrailMap';
import TrailMap from './TrailMap';
import Forecast from './Forecast';

class RoutePage extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Container>
                <div className="RoutePageHeadings">
                    <h1>{this.props.route['name']}</h1>
                </div>
                <Row className="mb-3">
                    <Col sm="12" md="7">
                        <img className="img-fluid" src="https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5323274.jpg"/>
                    </Col>
                    <Col sm="12" md="5">
                        <TrailMap lat='39.9515' lng='-105.5949'/>
                    </Col>
                </Row>
                <Row>
                    <Col sm="12">
                        <h1 className="RoutePageHeadings">Weather</h1>
                        <Row>
                            <Col sm="12" md="6">
                                <h3 className="RoutePageSubHeadings">Forecast</h3>
                                <Forecast lat='39.9515' lng='-105.5949'/>
                            </Col>
                            <Col sm="12" md="6">
                                <h3 className="RoutePageSubHeadings">Worst-Case Scenario</h3>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
    
}

export default RoutePage;
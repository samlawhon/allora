import React, { Fragment } from 'react';
import { Row, Col } from 'reactstrap';
import RouteSelectMap from './RouteSelectMap';
import CreateChart from './ElevationChart';
import RouteImage from './RouteImage';

const RouteInformation = props => {
    
    const address = props.selectedRoute.address ? `Starting address: ${props.selectedRoute.address}` : null;

    return (
        <Fragment>
            <div className="RoutePageHeadings pt-4 pb-4">
                <h1 className="display-4 font-weight-bold">{props.selectedRoute.name}</h1>
            </div>
            <Row className="mb-3">
                <Col sm="12" md="6">
                    <h3>Distance: {props.selectedRoute.distance.toFixed(2)} miles</h3>
                    <br />
                    <h3>Difficulty: {props.selectedRoute.difficulty}</h3>
                    <br />
                    <h3>Maximum Elevation: {props.selectedRoute.maxElevation.toFixed(0)} ft</h3>
                    <br />
                    <h3>{address}</h3>
                </Col>
                <Col sm="12" md="6">
                    <RouteSelectMap selectedRoute={props.selectedRoute}/>
                </Col>
            </Row>
            <Row>
                <Col id="elevation-chart">
                    <CreateChart data={props.selectedRoute.chartData}></CreateChart>
                </Col>
            </Row>
            <Row>
                <RouteImage 
                lat={props.selectedRoute.maxElevationCoords.lat}
                lng={props.selectedRoute.maxElevationCoords.lng}
                />
            </Row>
            <br/>
        </Fragment>
    );
}

export default RouteInformation;
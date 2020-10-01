import React from 'react';
import { Container, Row, Col, Media} from 'reactstrap';
import './RoutesMap.css'
import './RoutesPage.css'

const RoutesList = props => {

    const createRouteCard = ({image, name, lat, lng}) => (
        <Col xs="12" key={name}>
            <Media 
            id={name}
            data-lat={lat} 
            data-lng={lng} 
            onClick={props.handleTrailheadSelect} 
            className="mb-4 route-card rounded p-1"
            >
                <Media left>
                    <Media object src={image} className="route-small-image" />
                </Media>
                <Media body className="pl-3">
                    <Media heading>{name}</Media>
                </Media>
            </Media>
        </Col>
    )

    const createTrailheadList = () => (
        <Container>
            <Row>
                {props.trailheads.map(trailhead => createRouteCard(trailhead))}
            </Row>
        </Container>
    );

    return props.trailheads ? createTrailheadList() : <></>;
}

export default RoutesList;

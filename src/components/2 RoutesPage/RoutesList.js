import React, {Component} from 'react';
import { Container, Row, Col, Media} from 'reactstrap';
import './RoutesMap.css'
import './RoutesPage.css'

class RoutesList extends Component {

    createRouteCard = ({image, name, lat, lng}) => (
        <Col xs="12">
            <Media 
            id={name}
            data-lat={lat} 
            data-lng={lng} 
            onClick={this.props.handleTrailheadSelect} 
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

    render() {
        if (this.props.trailheads!==null) {
            if (this.props.trailheads!=='500') {
                return (
                    <Container>
                        <Row>
                            {this.props.trailheads.map(this.createRouteCard)}
                        </Row>
                    </Container>
                );
            }
            else {
                alert("Can't find location");
            }
        }
        else {
            return (
                <></>
            );
        }
    }
}

export default RoutesList;

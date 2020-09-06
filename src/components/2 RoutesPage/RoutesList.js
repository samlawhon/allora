import React, {Component} from 'react';
import { Container, Row, Col, Media} from 'reactstrap';
import './RoutesMap.css'
import './RoutesPage.css'

class RoutesList extends Component {

    createRouteCard = ({image, name, maxElev, lat, lng}) => (
        <Col xs="12">
            <Media data-img_link={image} data-name={name} data-maxelev={maxElev} id={name}
            data-lat={lat} data-lng={lng} onClick={this.props.handleTrailheadSelect} className="mb-4 route-card rounded p-1">
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
        if (this.props.trails!==null) {
            if (this.props.trails!=='500') {
                return (
                    <Container>
                        <Row>
                            {this.props.trails.map(this.createRouteCard)}
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

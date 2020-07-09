import React, {Component} from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

class Routes extends Component {

    createRouteCard = ({image, name, summary, maxElev, lat, lng}) => (
        <Col xs="12">
            <Card data-img_link={image} data-name={name} data-maxelev={maxElev} 
            data-lat={lat} data-lng={lng} onClick={this.props.handleRouteSelect} className="m-4">
                <CardImg src={image}/>
                <CardBody>
                    <CardTitle>{name}</CardTitle>
                    <CardText>{summary}</CardText>
                </CardBody>
            </Card>
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

export default Routes;

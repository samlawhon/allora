import React, {Component} from 'react';
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

const createRouteCard = ({image, name, rating}) => (
    <Col xs="12">
        <Card>
            <CardImg src={image}/>
            <CardBody>
                <CardTitle>{name}</CardTitle>
                <CardText>{rating}</CardText>
            </CardBody>
        </Card>
    </Col>
)

class Routes extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.trails!=null) {
            if (this.props.trails!='500') {
                return (
                    <Container>
                        <Row>
                            {this.props.trails.map(createRouteCard)}
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

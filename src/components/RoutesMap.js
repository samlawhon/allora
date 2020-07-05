import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import Routes from './Routes'
import { formatDiagnostic } from 'typescript';

class RoutesMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderMap() {
        if (this.props.havePlace===true) {
            return (
                <Container>
                    <Row>
                        <Col sm="12" md="8">
                            <h1>Map goes here</h1>
                        </Col>
                        <Col sm="12" md="4">
                            <Routes/>
                        </Col>
                    </Row>
                </Container>
            );
        }
        else {
            return (
                <></>
            );
        }
    }

    render() {
        return (
            this.renderMap()
        );
    }
}

export default RoutesMap;

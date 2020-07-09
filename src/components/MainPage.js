import React, { Component } from 'react';
import './MainPage.css';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, ToastBody, ToastHeader, Jumbotron} from 'reactstrap';

class MainPage extends Component {

    render() {
        return (
            <div>
                <Container id="homepageBackground" className="d-flex flex-row-reverse justify-content-right align-items-center" fluid>
                <Card className="mr-md-2 mr-lg-5">
                    <CardBody>
                        <CardTitle><h3>Outdoor trip planning is hard</h3></CardTitle>
                        <CardText>Eldora analyses outdoor risks to make your planning easier.</CardText>
                    </CardBody>
                </Card>
                </Container>
                <Container>
                    <h1 className="display-3 font-weight-bold main-header">Plan your next adventure</h1>
                    <Row>
                        <Col sm="12" md="6" className="mt-5 pr-5">
                            <h3 className="font-weight-bold main-sub-header">Where to?</h3>
                            <br/>
                            <h5>Search by city or trail</h5>
                            <form onChange={ this.props.changeHandler } onSubmit={ this.props.submitHandler }>
                                <input className="form-control form-text" type="text" name="location" placeholder="Nederland, CO"/>
                            </form>
                        </Col>
                        <Col sm="12" md="6" className="mt-5 pl-5">
                            <h3 className="font-weight-bold main-sub-header">More Options</h3>
                        </Col>
                    </Row>
                </Container>
            </div> 
        );
    }
}

{/*
    Date of trip
    Activity type
*/}

export default MainPage;

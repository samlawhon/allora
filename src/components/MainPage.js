import React, { Component } from 'react';
import './MainPage.css';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, ToastBody, ToastHeader, Jumbotron} from 'reactstrap';

class MainPage extends Component {

    render() {
        const opacity = 75/Math.max(this.props.currentScrollHeight, 0.01);
        return (
            <div>
                <Container id="homepageBackground" className="d-flex flex-row-reverse justify-content-right align-items-center" fluid>
                <Card className="mr-md-2 mr-lg-5" style={{opacity}}>
                    <CardBody>
                        <CardTitle><h3>Outdoor trip planning is hard</h3></CardTitle>
                        <CardText>Eldora analyses outdoor risks to make your planning easier.</CardText>
                    </CardBody>
                </Card>
                </Container>
                <br/>
                <Container>
                    <h1 className="display-3 font-weight-bold main-header">Plan your next adventure</h1>
                    <Row>
                        <Col sm="12" md="6" className="mt-5 pr-5">
                            <h3 className="font-weight-bold main-sub-header">Where to?</h3>
                            <h5>Search by city or trail</h5>
                            <br/>
                            <form onChange={ this.props.changeHandler } onSubmit={ this.props.submitHandler }>
                                <label for="date">Date:</label>
                                <br/>
                                <input className="form control" type="Date" value="2020-08-09" id="date"></input>
                                <br/>
                                <br/>
                                <label for="search-bar">Location: </label>
                                <br/>
                                <input className="form-control form-text" type="text" name="location" id="search-bar" placeholder="Nederland, CO"/>
                                <br/>
                                <button type="submit" className="btn btn-primary">Submit</button>
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

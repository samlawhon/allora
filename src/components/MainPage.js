import React, { Component } from 'react';
import './MainPage.css';
<<<<<<< HEAD
import { Container, Row, Col } from 'reactstrap';
import TrailsMap from './TrailsMap';
import OpeningBanner from './OpeningBanner';
import SearchForm from './SearchForm';
=======
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, ToastBody, ToastHeader, Jumbotron} from 'reactstrap';
>>>>>>> 94191e4a... Finishing adding weather forecast + historical, on to website redesign

class MainPage extends Component {

    render() {
        return (
            <div>
<<<<<<< HEAD
                <OpeningBanner currentScrollHeight={this.props.currentScrollHeight}/>
=======
                <Container id="homepageBackground" className="d-flex flex-row-reverse justify-content-right align-items-center" fluid>
                <Card className="mr-md-2 mr-lg-5">
                    <CardBody>
                        <CardTitle><h3>Outdoor trip planning is hard</h3></CardTitle>
                        <CardText>Eldora analyses outdoor risks to make your planning easier.</CardText>
                    </CardBody>
                </Card>
                </Container>
>>>>>>> 94191e4a... Finishing adding weather forecast + historical, on to website redesign
                <Container>
                    <h1 className="display-3 font-weight-bold main-header">Plan your next adventure</h1>
                    <Row>
                        <Col sm="12" md="6" className="mt-5 pr-5">
<<<<<<< HEAD
                            <SearchForm changeHandler={ this.props.changeHandler } submitHandler={ this.props.submitHandler }/>
                        </Col>
                        <Col sm="12" md="6" className="mt-5 pl-5">
                            <h3 className="font-weight-bold main-sub-header">Other Options</h3>
=======
                            <h3 className="font-weight-bold main-sub-header">Where to?</h3>
                            <br/>
                            <h5>Search by city or trail</h5>
                            <form onChange={ this.props.changeHandler } onSubmit={ this.props.submitHandler }>
                                <input className="form-control form-text" type="text" name="location" placeholder="Nederland, CO"/>
                            </form>
                        </Col>
                        <Col sm="12" md="6" className="mt-5 pl-5">
                            <h3 className="font-weight-bold main-sub-header">More Options</h3>
>>>>>>> 94191e4a... Finishing adding weather forecast + historical, on to website redesign
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
<<<<<<< HEAD
    Distance from destination
    Topo
=======
>>>>>>> 94191e4a... Finishing adding weather forecast + historical, on to website redesign
*/}

export default MainPage;

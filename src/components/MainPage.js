import React, { Component } from 'react';
import './MainPage.css';
import { Container, Row, Col } from 'reactstrap';
import TrailsMap from './TrailsMap';
import OpeningBanner from './OpeningBanner';
import SearchForm from './SearchForm';

class MainPage extends Component {

    render() {
        const opacity = 75/Math.max(this.props.currentScrollHeight, 0.01);
        return (
            <div>
                <OpeningBanner currentScrollHeight={this.props.currentScrollHeight}/>
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
                            <SearchForm changeHandler={ this.props.changeHandler } submitHandler={ this.props.submitHandler }/>
                        </Col>
                        <Col sm="12" md="6" className="mt-5 pl-5">
                            <h3 className="font-weight-bold main-sub-header">Other Options</h3>
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
    Distance from destination
    Topo
*/}

export default MainPage;

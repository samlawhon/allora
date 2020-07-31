import React, { Component } from 'react';
import './MainPage.css';
import { Card, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';
import TrailsMap from './TrailsMap';
import OpeningBanner from './OpeningBanner';
import SearchForm from './SearchForm';
import DateForm from './DateForm';

class MainPage extends Component {

    render() {
        const startingOpacity = 75;
        const opacity = startingOpacity/Math.max(this.props.currentScrollHeight, 0.01);
        return (
            <div>
                <OpeningBanner currentScrollHeight={this.props.currentScrollHeight}/>
                <br/>
                <Container>
                    <h1 className="display-3 font-weight-bold main-header">Plan your next adventure</h1>
                    <Row>
                        <Col sm="12" md="5" className="mt-5 pr-5">
                            <SearchForm changeHandler={ this.props.changeHandler } submitHandler={ this.props.submitHandler }/>
                        </Col>
                        <Col sm="12" md="7" className="mt-5 pl-5">
                            <DateForm handleDayClick={this.props.handleDayClick} from={this.props.from} to={this.props.to}/>
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

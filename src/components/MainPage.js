import React, { Component } from 'react';
import './MainPage.css';
import { Container, Row, Col } from 'reactstrap';
import TrailsMap from './TrailsMap';
import OpeningBanner from './OpeningBanner';
import SearchForm from './SearchForm';

class MainPage extends Component {

    render() {
        return (
            <div>
                <OpeningBanner currentScrollHeight={this.props.currentScrollHeight}/>
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

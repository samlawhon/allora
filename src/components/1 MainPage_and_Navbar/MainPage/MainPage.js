import React, { Component } from 'react';
import './MainPage.css';
import { Container, Row, Col } from 'reactstrap';
import OpeningBanner from './OpeningBanner';
import SearchForm from './SearchForm';
import DateForm from './DateForm';

class MainPage extends Component {

    render() {
        return (
            <div id="main-page">
                <OpeningBanner/>
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

export default MainPage;

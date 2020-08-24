import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './RouteSelectPage.css';
import RouteSelectMap from './RouteSelectMap';
import Forecast from './Forecast';
import BadWeatherCase from './BadWeatherCase';

class RouteSelectPage extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            months: {
                "Jan": 1,
                "Feb": 2,
                "Mar": 3,
                "Apr": 4,
                "May": 5,
                "Jun": 6,
                "Jul": 7,
                "Aug": 8,
                "Sep": 9,
                "Oct": 10,
                "Nov": 11,
                "Dec": 12
            }
        }
    }
    
    day() {
        const d = new Date();
        const da = d.getDate();
        return da;
    }

    month() {
        const d = new Date();
        const mo = d.getMonth();
        return mo+1;
    }

    getDate(from, to) {
        let day = this.day();
        let month = this.month();
        if (from && to) {
            let fromDay = Number(String(from).slice(8, 10));
            let fromMonth = this.state.months[String(from).slice(4, 7)];
            let toDay = Number(String(to).slice(8, 10));
            let toMonth = this.state.months[String(to).slice(4, 7)];
            let mid_year = 7;
            /* if the month of the start of the trip is prior to middle of the year, 
            use the start of the trip date (when it will be coldest) for the worst case weather analysis,
            otherwise use the end of the trip date (when it will be coldest). */
            if (fromMonth <= mid_year) {
                day = fromDay;
                month = fromMonth;
            }
            else {
                day = toDay;
                month = toMonth;
            }
        }
        else if (from) {
            day = Number(String(from).slice(8, 10));
            month = this.state.months[String(from).slice(4, 7)];
        }
        return { day, month };
    }

    render() {
        const { day, month } = this.getDate(this.props.from, this.props.to);
        return (
            <Container>
                <div className="RoutePageHeadings pt-4 pb-4">
                    <h1 className="display-4 font-weight-bold">{this.props.route.name}</h1>
                </div>
                <Row className="mb-3">
                    <Col sm="12" md="6">
                        <img className="img-fluid route-image" src={this.props.route.img_link}/>
                    </Col>
                    <Col sm="12" md="6">
                        <RouteSelectMap lat={this.props.route.lat} lng={this.props.route.lng}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm="12">
                        <h1 className="RoutePageHeadings pt-4 pb-4 font-weight-bold">Weather</h1>
                        <Row>
                            <Col sm="12" md="6">
                                <h3 className="RoutePageSubHeadings pb-2">Forecast</h3>
                                <Forecast lat={this.props.route.lat} lng={this.props.route.lng}/>
                            </Col>
                            <Col sm="12" md="6">
                                <h3 className="RoutePageSubHeadings pb-2">Realistic Bad Weather Case</h3>
                                <BadWeatherCase lat={this.props.route.lat} lng={this.props.route.lng} day={day} month={month} maxElev={this.props.route.maxElev}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
            </Container>
        );
    }
    
}

export default RouteSelectPage;
import React, { Component } from 'react';
import './RoutePage.css';
import { Container, Row, Col } from 'reactstrap';
import './TrailMap';
import TrailMap from './TrailMap';
import Forecast from './Forecast';
import BadWeatherCase from './BadWeatherCase';

class RoutePage extends Component {
    
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
        let fromDay = null;
        let fromMonth = null;
        if (from) {
            fromDay = Number(String(from).slice(8, 10));
            fromMonth = this.state.months[String(from).slice(4, 7)];
        }
        let toDay = null;
        let toMonth = null;
        if (to) {
            toDay = Number(String(to).slice(8, 10));
            toMonth = this.state.months[String(to).slice(4, 7)];
        }
        let day = this.day();
        let month = this.month();
        if (fromDay && fromMonth) {
            day = fromDay;
            month = fromMonth;
        }
        if ((toDay && toMonth) && (fromDay && fromMonth)) {
            if (fromMonth <= 7) {
                day = fromDay;
                month = fromMonth;
            }
            else {
                day = toDay;
                month = toMonth;
            }
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
                        <TrailMap lat={this.props.route.lat} lng={this.props.route.lng}/>
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

export default RoutePage;
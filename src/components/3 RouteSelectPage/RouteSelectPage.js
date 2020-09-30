import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Forecast from './Forecast';
import BadWeatherCase from './BadWeatherCase';
import RouteInformation from './RouteInformation';
import './RouteSelectPage.css';

const RouteSelectPage = props => {
    
    const MONTHS_TO_DIGITS = {
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
    
    const currentDate = () => new Date().getDate();

    const currentMonth = () => new Date().getMonth() + 1;

    const getDate = (from, to) => {
        let day = currentDate();
        let month = currentMonth();
        if (from && to) {
            const fromDay = Number(String(from).slice(8, 10));
            const fromMonth = MONTHS_TO_DIGITS[String(from).slice(4, 7)];
            const toDay = Number(String(to).slice(8, 10));
            const toMonth = MONTHS_TO_DIGITS[String(to).slice(4, 7)];
            const mid_year = 7;
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
            month = MONTHS_TO_DIGITS[String(from).slice(4, 7)];
        }
        return { day, month };
    }

    const { day, month } = getDate(props.from, props.to);
    
    return (
        <Container>
            <RouteInformation selectedRoute={props.selectedRoute} />
            <Row>
                <Col sm="12">
                    <h1 className="RoutePageHeadings pt-4 pb-4 font-weight-bold">Weather</h1>
                    <Row>
                        <Col sm="12" md="6">
                            <h3 className="RoutePageSubHeadings pb-2">Forecast</h3>
                            <Forecast 
                            lat={props.selectedRoute.maxElevationCoords.lat} 
                            lng={props.selectedRoute.maxElevationCoords.lng}
                            />
                        </Col>
                        <Col sm="12" md="6">
                            <h3 className="RoutePageSubHeadings pb-2">Historical Worst Case Weather Scenario</h3>
                            <BadWeatherCase 
                            lat={props.selectedRoute.maxElevationCoords.lat} 
                            lng={props.selectedRoute.maxElevationCoords.lng} 
                            day={day} 
                            month={month} 
                            maxElev={props.selectedRoute.maxElevation}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <br/>
        </Container>
    );
}

export default RouteSelectPage;
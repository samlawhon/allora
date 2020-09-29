import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import './RouteSelectPage.css';
import './Forecast.css';

const Forecast = props => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const payload = {
            ...props
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload)
        }
        fetch('/weather', requestOptions).then(response => response.json()).then(weatherData => setWeatherData(weatherData));
    }, [props.lat, props.lng]);

    const dayForecast = n => {
        const today = (new Date().getDay() + n) % 7;
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const mainDescription = weatherData.daily[n].weather[0].main;
        const icon = weatherData.daily[n].weather[0].icon;
        const iconAddress = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const { min, max } = weatherData.daily[n].temp;
        return (
            <Container className="text-left" key={n}>
                <h5>{ days[today] }</h5>
                <Row>
                    <Col sm="12" md="4">
                        <img className="img-fluid" src={ iconAddress } alt=""/>
                    </Col>
                    <Col sm="12" md="8" className="d-flex justify-content-center">
                        <Row>
                            <Col sm="12">
                                <h4>{ mainDescription }</h4>
                            </Col>
                            <Col sm="12">
                                <p>Max temp: { max }</p>
                                <p>Min temp: { min }</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    const generateForecastList = () => (
        <div className="forecastList pt-2">
            {[...Array(7).keys()].map(day => dayForecast(day))}
        </div>
    );

    return weatherData ? generateForecastList() : <p>Weather data loading</p>;
}

export default Forecast;
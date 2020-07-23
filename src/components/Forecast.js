import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import './RoutePage.css';
import './Forecast.css';

class Forecast extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            weatherData: null
        }
    }

    componentDidMount() {
        const data = {
            lat: this.props.lat,
            lng: this.props.lng
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        }

        fetch('/weather', requestOptions).then(response => response.json()).then(data => this.setState({weatherData: data}));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.lat!==nextProps.lat && this.props.lng!==nextProps.lng) {
            const data = {
                lat: nextProps.lat,
                lng: nextProps.lng
            }
    
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(data)
            }
    
            fetch('/weather', requestOptions).then(response => response.json()).then(data => this.setState({weatherData: data}));
        }
    }

    dayForecast(n) {
        const d = new Date();
        const today = (d.getDay() + n)%7;
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const mainDescription = this.state.weatherData['daily'][n]['weather'][0]['main'];
        const icon = this.state.weatherData['daily'][n]['weather'][0]['icon'];
        const iconAddress = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        const maxTemp = this.state.weatherData['daily'][n]['temp']['max'];
        const minTemp = this.state.weatherData['daily'][n]['temp']['min'];
        return (
            <Container className="text-left">
                <h5>{ days[today] }</h5>
                <Row>
                    <Col sm="12" md="4">
                        <img className="img-fluid" src={ iconAddress }/>
                    </Col>
                    <Col sm="12" md="8" className="d-flex justify-content-center">
                        <Row>
                            <Col sm="12">
                                <h4>{ mainDescription }</h4>
                            </Col>
                            <Col sm="12">
                                <p>Max temp: { maxTemp }</p>
                                <p>Min temp: { minTemp }</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }

    render() {
        if (this.state.weatherData!==null) {
            return(
                <div className="forecastList pt-2">
                    { this.dayForecast(0) }
                    { this.dayForecast(1) }
                    { this.dayForecast(2) }
                    { this.dayForecast(3) }
                    { this.dayForecast(4) }
                    { this.dayForecast(5) }
                    { this.dayForecast(6) }
                </div>
            );
        }
        else {
            return (
                <p>No weather data yet</p>
            );
        }
    }
}

export default Forecast;
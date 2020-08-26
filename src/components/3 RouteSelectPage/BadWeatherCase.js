import React, { Component } from 'react';
import './RouteSelectPage.css';

class BadWeatherCase extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            lowest_temp: null
        }

    }

    componentDidMount() {
        const data = {
            lat: this.props.lat,
            lng: this.props.lng,
            day: this.props.day,
            month: this.props.month,
            maxElev: this.props.maxElev
        }

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        }

        fetch('/coldest-weather', requestOptions).then(response => response.json()).then(data => this.setState({lowest_temp: data}));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.lat!==nextProps.lat && this.props.lng!==nextProps.lng) {
            const data = {
                lat: nextProps.lat,
                lng: nextProps.lng,
                day: nextProps.day,
                month: nextProps.month,
                maxElev: nextProps.maxElev
            }
    
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(data)
            }
    
            fetch('/coldest-weather', requestOptions).then(response => response.json()).then(data => this.setState({lowest_temp: data}));
        }
    }

    renderBadCaseImage() {
        if (this.state.lowest_temp < 25) {
            return (
                <div>
                    <h5>Prepare for extreme cold, with temperatures as low as {this.state.lowest_temp}</h5>
                    <img className="img-fluid" src="https://images.unsplash.com/photo-1502809027077-657ca9c746af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="People hiking in extreme cold"/>
                </div>
            );
        }
        else if ( 25 <= this.state.lowest_temp && this.state.lowest_temp < 40 ) {
            return (
                <div>
                    <h5>Prepare for cold temperatures as low as {this.state.lowest_temp}</h5>
                    <img className="img-fluid" src="https://images.unsplash.com/photo-1516573454759-d43e4d43dce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="People hiking in the cold"/>
                </div>
            );
        }
        else if (40 <= this.state.lowest_temp && this.state.lowest_temp < 55) {
            return (
                <div>
                    <h5>Prepare for chilly temperatures as low as {this.state.lowest_temp}</h5>
                    <img className="img-fluid" src="https://images.unsplash.com/photo-1536105761318-666e135000d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="People hiking in chilly, windy weather"/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h5>Prepare for temperatures as cool as {this.state.lowest_temp}</h5>
                    <img className="img-fluid" src="https://images.unsplash.com/photo-1521860253737-a33db0898cc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" alt="People hiking in cool weather"/>
                </div>
            );
        }
    }

    render() {
        if (this.state.lowest_temp!==null) {
            return (
                <div className="RoutePageSubHeadings">
                    {this.renderBadCaseImage()}
                </div>
            );
        }
        else {
            return (
                <div>
                    <p>Realistic bad weather case loading</p>
                </div>
            );
        }
    }
}

export default BadWeatherCase;
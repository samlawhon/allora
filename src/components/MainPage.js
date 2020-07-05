import React, { Component } from 'react';
import './MainPage.css';

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            location: null
        }
    } 

    submitHandler(event) {
        event.preventDefault();
        this.setState({location: event.target.value})
        console.log("Here")
    }

    render() {
        return (
            <div className="container" id="homepageBackground">
                <div id="homeCenter">
                    <div className="row align-items-center">
                        <div className="col-lg-6 offset-lg-3">
                            <h1 className="display-4" id="mainHeading">Plan your next adventure: </h1>
                            <h1 id="mainQuestion">Where to?</h1>
                            <hr id="mainpageLine" />
                            <form onSubmit= { this.submitHandler() }>
                                <input className="form-control" type="text" name="location" placeholder="Nederland, CO"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainPage;

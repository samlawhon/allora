import React, { Component } from 'react';
import { DateUtils } from 'react-day-picker'
import './App.css';
import NavigationBar from './components/1 MainPage_and_Navbar/NavigationBar';
import MainPage from './components/1 MainPage_and_Navbar/MainPage/MainPage';
import RoutesPage from './components/2 RoutesPage/RoutesPage';
import RouteSelectPage from './components/3 RouteSelectPage/RouteSelectPage';

class App extends Component {

  constructor(props) {

    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);

    this.state = {
      location: null,
      havePlace: false,
      selectedRoute: null,
      haveRoute: false,
      from: null,
      to: null
    }

  }


  handleDayClick(day){
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  changeHandler(event) {
    event.preventDefault();
    this.setState({location: event.target.value});
    this.setState({
      havePlace: false,
      haveRoute: false,
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({havePlace: true});
    setTimeout(() => {
      let navbar = document.getElementsByClassName("navbar")[0];
      let mainPage = document.getElementById("main-page");
      let scrollOptions = {
        top: mainPage.scrollHeight - navbar.scrollHeight,
        left: 0,
        behavior: 'smooth'
      }
      window.scroll(scrollOptions);
    }, 500);
  }

  handleRouteSelect(event, name, positions, distance) {
    event.preventDefault();
    const payload = {
      coords: positions
    }
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload)
    }
    fetch('/elevation', requestOptions).then(response => response.json()).then(data => {
      this.setState({
        selectedRoute: {
          name: name,
          coords: data["coords"],
          distance: distance,
          difficulty: data["difficulty"],
          maxElevation: data["maximumElevation"],
          maxElevationCoords: data["maximumElevationCoordinates"],
          chartData: data["chartData"]
        },
        haveRoute: true
      })
    })
    setTimeout(() => {
      let navbar = document.getElementsByClassName("navbar")[0];
      let mainPage = document.getElementById("main-page");
      let routesPage = document.getElementById("routes-page");
      let scrollOptions = {
        top: mainPage.scrollHeight + routesPage.scrollHeight - navbar.scrollHeight,
        left: 0,
        behavior: 'smooth'
      }
      window.scroll(scrollOptions);
    }, 1000);
  }

  render() {
    if (!this.state.havePlace) {
      return (
        <div className="App">
          <NavigationBar/>
          <MainPage 
          changeHandler={this.changeHandler} 
          submitHandler={this.submitHandler} 
          handleDayClick={this.handleDayClick} 
          from={this.state.from} 
          to={this.state.to}
          />
          <br/>
        </div>
      );
    }
    else if (!this.state.haveRoute) {
      return (
        <div className="App">
          <NavigationBar/>
          <MainPage 
          changeHandler={this.changeHandler} 
          submitHandler={this.submitHandler} 
          handleDayClick={this.handleDayClick} 
          from={this.state.from} 
          to={this.state.to}
          />
          <br/>
          <RoutesPage 
          havePlace={this.state.havePlace} 
          location={this.state.location} 
          handleRouteSelect={this.handleRouteSelect}
          />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <NavigationBar/>
          <MainPage 
          changeHandler={this.changeHandler} 
          submitHandler={this.submitHandler} 
          handleDayClick={this.handleDayClick} 
          from={this.state.from} 
          to={this.state.to}
          />
          <br/>
          <RoutesPage 
          havePlace={this.state.havePlace} 
          location={this.state.location} 
          handleRouteSelect={this.handleRouteSelect}
          />
          <br/>
          <RouteSelectPage 
          route={this.state.route}
          selectedRoute={this.state.selectedRoute} 
          from={this.state.from} 
          to={this.state.to}
          />
        </div>
      );
    }
  }
}
  

export default App;

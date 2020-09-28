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

    this.locationChangeHandler = this.locationChangeHandler.bind(this);
    this.distanceChangeHandler = this.distanceChangeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleJoinedRouteSelect = this.handleJoinedRouteSelect.bind(this);

    this.state = {
      location: null,
      maxDistance: 10,
      havePlace: false,
      selectedRoute: null,
      haveRoute: false,
      from: null,
      to: null
    }

  }

  locationChangeHandler(event) {
    this.setState({
      havePlace: false,
      location: event.currentTarget.value
    });
  }

  distanceChangeHandler(event) {
    this.setState({
      havePlace: false,
      maxDistance: Number(event.currentTarget.value)
    });
  }

  handleDayClick(day){
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState({
      ...range,
      havePlace: false
    });
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({
      havePlace: true,
    });
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

  handleJoinedRouteSelect(name, routes) {
    const payload = {
      routes: routes
    }

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload)
    }

    this.setState({haveRoute: false});
    fetch('/multi-route-elevation', requestOptions).then(response => response.json()).then(data => {
      this.setState({
        selectedRoute: {
          name: name,
          coords: data['coords'],
          distance: data['distance'],
          difficulty: data['difficulty'],
          maxElevation: data["maximumElevation"],
          maxElevationCoords: data["maximumElevationCoordinates"],
          chartData: data["chartData"]
        },
        haveRoute: true
      });
    }).catch(() => {
      alert("route too long");
    }).then(() => {
      if (this.state.haveRoute) {
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
    });
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
    this.setState({haveRoute: false});
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
      });
    }).then(() => {
      setTimeout(() => {
        if (this.state.haveRoute) {
          let navbar = document.getElementsByClassName("navbar")[0];
          let mainPage = document.getElementById("main-page");
          let routesPage = document.getElementById("routes-page");
          let scrollOptions = {
            top: mainPage.scrollHeight + routesPage.scrollHeight - navbar.scrollHeight,
            left: 0,
            behavior: 'smooth'
          }
          window.scroll(scrollOptions);
        }
      }, 1000);
    });
  }

  render() {
    if (!this.state.havePlace) {
      return (
        <div className="App">
          <NavigationBar/>
          <MainPage 
          locationChangeHandler={this.locationChangeHandler}
          distanceChangeHandler={this.distanceChangeHandler}
          distance={this.state.maxDistance}
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
          locationChangeHandler={this.locationChangeHandler}
          distanceChangeHandler={this.distanceChangeHandler}
          distance={this.state.maxDistance}
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
          handleJoinedRouteSelect={this.handleJoinedRouteSelect}
          maxDistance={this.state.maxDistance}
          />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <NavigationBar/>
          <MainPage 
          locationChangeHandler={this.locationChangeHandler}
          distanceChangeHandler={this.distanceChangeHandler}
          distance={this.state.maxDistance}
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
          handleJoinedRouteSelect={this.handleJoinedRouteSelect}
          maxDistance={this.state.maxDistance}
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

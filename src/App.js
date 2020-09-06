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
      route: {
        name: null,
        img_link: null,
        lat: null,
        lng: null,
        maxElev: null
      },
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
      route: {
        name: null,
        img_link: null,
        lat: null,
        lng: null,
        maxElev: null
      },
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

  handleRouteSelect(event) {
    event.preventDefault();
    this.setState({
      route : {
        name: event.currentTarget.dataset.name,
        img_link: event.currentTarget.dataset.img_link,
        maxElev: event.currentTarget.dataset.maxelev,
        lat: event.currentTarget.dataset.lat,
        lng: event.currentTarget.dataset.lng,
      },
      haveRoute: true
    });
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
    }, 500);
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
          from={this.state.from} 
          to={this.state.to}
          />
        </div>
      );
    }
  }
}
  

export default App;

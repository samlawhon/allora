import React, {Component} from 'react';
import './App.css';
import RoutesMap from './components/RoutesMap';
import NavigationBar from './components/NavigationBar';
import MainPage from './components/MainPage';
import RoutePage from './components/RoutePage';

class App extends Component {

  constructor(props) {

    super(props);

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleRouteSelect = this.handleRouteSelect.bind(this);

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
      currentScrollHeight: 1
    }

  }

  componentDidMount() {
    window.onscroll = () => {
        this.setState({currentScrollHeight: window.scrollY});
    }
}

  changeHandler(event) {
    event.preventDefault();
    this.setState({location: event.target.value});
    this.setState({havePlace: false});
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({havePlace: true});
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
  }

render() {
  if (!this.state.havePlace) {
    return (
      <div className="App">
        <NavigationBar currentScrollHeight={this.state.currentScrollHeight}/>
        <MainPage changeHandler={this.changeHandler} submitHandler={this.submitHandler} currentScrollHeight={this.state.currentScrollHeight}/>
        <br/>
      </div>
    );
  }
  else if (!this.state.haveRoute) {
    return (
      <div className="App">
        <NavigationBar currentScrollHeight={this.state.currentScrollHeight}/>
        <MainPage changeHandler={this.changeHandler} submitHandler={this.submitHandler} currentScrollHeight={this.state.currentScrollHeight}/>
        <br/>
        <RoutesMap havePlace={this.state.havePlace} location={this.state.location} handleRouteSelect={this.handleRouteSelect}/>
      </div>
    );
  }
  else {
    console.log("App: ");
    console.log(this.state.route);
    return (
      <div className="App">
        <NavigationBar currentScrollHeight={this.state.currentScrollHeight}/>
        <MainPage changeHandler={this.changeHandler} submitHandler={this.submitHandler} currentScrollHeight={this.state.currentScrollHeight}/>
        <br/>
        <RoutesMap havePlace={this.state.havePlace} location={this.state.location} handleRouteSelect={this.handleRouteSelect}/>
        <br/>
        <RoutePage route={this.state.route}/>
      </div>
    );
  }
}
}
  

export default App;

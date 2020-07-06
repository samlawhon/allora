import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RoutesMap from './components/RoutesMap';
import NavigationBar from './components/NavigationBar';
import MainPage from './components/MainPage';
import RoutePage from './components/RoutePage';

class App extends Component {

  constructor(props) {

    super(props);

    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)

    this.state = {
      location: null,
      havePlace: false,
      route: null,
      haveRoute: false
    }

  }

  changeHandler(event) {
    event.preventDefault();
    this.setState({location: event.target.value});
    this.setState({havePlace: false});
  }

  submitHandler(event) {
    event.preventDefault();
    this.setState({havePlace: true})
  }

render() {
  if (!this.state.havePlace) {
    return (
      <div className="App">
        <NavigationBar/>
        <MainPage changeHandler={this.changeHandler} submitHandler={this.submitHandler}/>
      </div>
    );
  }
  else if (!this.state.haveRoute) {
    return (
      <div className="App">
        <NavigationBar/>
        <MainPage changeHandler={this.changeHandler} submitHandler={this.submitHandler}/>
        <RoutesMap havePlace={this.state.havePlace} location={this.state.location}/>
      </div>
    );
  }
  else {
    return (
      <div className="App">
        <NavigationBar/>
        <MainPage changeHandler={this.changeHandler} submitHandler={this.submitHandler}/>
        <RoutesMap havePlace={this.state.havePlace} location={this.state.location}/>
        <RoutePage/>
      </div>
    );
  }
}
}
  

export default App;

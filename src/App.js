import React, { useState, useEffect, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RoutesMap from './components/RoutesMap';
import NavigationBar from './components/NavigationBar';
import MainPage from './components/MainPage';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      havePlace: true
    }

  }

render() {
  return (
    <div className="App">
      <NavigationBar/>
      <MainPage/>
      <RoutesMap havePlace={this.state.havePlace}/>
    </div>
  );
}
}
  

export default App;

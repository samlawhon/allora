import React, { useState, useEffect, Component} from 'react';
import logo from './logo.svg';
import './App.css';
import RoutesMap from './components/RoutesMap';
import NavigationBar from './components/NavigationBar';

class App extends Component {

  constructor(props) {

    super(props);

    this.state = {
      quote: null,
      havePlace: false
    }

  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    fetch('/name').then(res => res.json()).then(data => this.setState( {
        quote: data.name
      }));
  }

render() {
  return (
    <div className="App">
      <NavigationBar/>
      <header className="App-header">
        <p> Pearl of wisdom is:  {this.state.quote}</p>
      </header>
      <RoutesMap havePlace={this.state.havePlace}/>
    </div>
  );
}
}
  

export default App;

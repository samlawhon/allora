import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';

function App() {
  const [currentQuote, setCurrentQuote] = useState(0);

  const [selectedRoute, setSelectedRoute] = useState(0);

  useEffect(() => {
    fetch('/name').then(res=>res.json()).then(data => {
    setCurrentQuote(data.name);
    });
    }, []);

  return (
    <div className="App">
      <NavigationBar/>
      <header className="App-header">
        <p> Pearl of wisdom is:  {currentQuote}</p>
      </header>
    </div>
  );
}

export default App;

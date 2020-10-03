import React, { useState, Fragment, useEffect } from 'react';
import { DateUtils } from 'react-day-picker'
import NavigationBar from './components/1 MainPage_and_Navbar/NavigationBar';
import MainPage from './components/1 MainPage_and_Navbar/MainPage/MainPage';
import RoutesPage from './components/2 RoutesPage/RoutesPage';
import RouteSelectPage from './components/3 RouteSelectPage/RouteSelectPage';
import './App.css';

const App = () => {

  // form states
  const [location, setLocation] = useState(null);
  const [maxDistance, setMaxDistance] = useState(10);
  const [dayRange, setDayRange] = useState({from: null, to: null});

  // havePlace determines whether the routes page loads
  const [havePlace, setHavePlace] = useState(false);

  // selectedRoute determines whether the route information page loads
  const [selectedRoute, setSelectedRoute] = useState(null);


  // form handle change functions
  const locationChangeHandler = event => {
    setHavePlace(false);
    setLocation(event.currentTarget.value);
  }
  const distanceChangeHandler = event => {
    setHavePlace(false);
    setMaxDistance(Number(event.currentTarget.value));
  }
  const handleDayClick = day => {
    setHavePlace(false);
    const range = DateUtils.addDayToRange(day, dayRange);
    setDayRange({
      ...range
    });
  }

  // on form submit, only havePlace changes, because location will be passed to children as is
  const submitHandler = event => {
    event.preventDefault();
    setHavePlace(true);
    setTimeout(() => {
      const navbar = document.getElementsByClassName("navbar")[0];
      const mainPage = document.getElementById("main-page");
      const scrollOptions = {
        top: mainPage.scrollHeight - navbar.scrollHeight,
        left: 0,
        behavior: 'smooth'
      }
      window.scroll(scrollOptions);
    }, 500);
    setSelectedRoute(null);
  }

  // listen for changes to selectedRoute to scroll to right place on page, but do nothing on initial render
  useEffect( () => {
    setTimeout(() => {
      const navbar = document.getElementsByClassName("navbar")[0];
      const mainPage = document.getElementById("main-page");
      const routesPage = document.getElementById("routes-page");
      try {
        const scrollOptions = {
          top: mainPage.scrollHeight + routesPage.scrollHeight - navbar.scrollHeight,
          left: 0,
          behavior: 'smooth'
        }
        window.scroll(scrollOptions);
      }
      catch {}
    }, 500);
  }, [selectedRoute])


  // this requires a separate function from handleRouteSelect because it hits a different endpoint
  const handleJoinedRouteSelect = (name, routes) => {

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        routes: routes
      })
    }
    
    fetch('/multi-route-elevation', requestOptions).then(response => response.json()).then(data => {
      setSelectedRoute({
        name: name,
        coords: data.coords,
        distance: data.distance,
        difficulty: data.difficulty,
        maxElevation: data.maximumElevation,
        maxElevationCoords: data.maximumElevationCoordinates,
        chartData: data.chartData,
        address: data.address
      });
    }).catch(() => alert("route too long"));
  }


  const handleRouteSelect = (event, name, positions, distance) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        coords: positions
      })
    }
    
    fetch('/elevation', requestOptions).then(response => response.json()).then(data => {
      setSelectedRoute({
        name: name,
        coords: data.coords,
        distance: distance,
        difficulty: data.difficulty,
        maxElevation: data.maximumElevation,
        maxElevationCoords: data.maximumElevationCoordinates,
        chartData: data.chartData,
        address: data.address
      });
    });
  }

  const renderRoutesPage = () => (
    <RoutesPage 
    havePlace={havePlace} 
    location={location} 
    handleRouteSelect={handleRouteSelect}
    handleJoinedRouteSelect={handleJoinedRouteSelect}
    maxDistance={maxDistance}
    />
  );

  const renderRouteSelectPage = () => (
    <RouteSelectPage 
    selectedRoute={selectedRoute} 
    from={dayRange.from} 
    to={dayRange.to}
    />
  );

  const mainPage = (
    <Fragment>
      <NavigationBar/>
      <MainPage 
      locationChangeHandler={locationChangeHandler}
      distanceChangeHandler={distanceChangeHandler}
      distance={maxDistance}
      submitHandler={submitHandler} 
      handleDayClick={handleDayClick} 
      from={dayRange.from} 
      to={dayRange.to}
      />
    </Fragment>
  );

  const routesPage = havePlace ? renderRoutesPage() : null;
  const routeSelectPage = (havePlace && selectedRoute) ? renderRouteSelectPage() : null;

  return (
    <div className="App">
      {mainPage}
      <br/>
      {routesPage}
      <br/>
      {routeSelectPage}
      <br/>
    </div>
  );
}

export default App;

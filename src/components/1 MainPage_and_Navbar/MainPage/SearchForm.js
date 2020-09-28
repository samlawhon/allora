import React from 'react';

const SearchForm = props => (
    <div>
        <h3 className="font-weight-bold main-sub-header">Where to?</h3>
        <form onSubmit={props.submitHandler}>
            <label htmlFor="search-bar"><h5>Search by city, trail or route</h5></label>
            <input 
            className="form-control form-text" 
            onChange={props.locationChangeHandler} 
            type="text" 
            name="location" 
            id="search-bar" 
            placeholder="e.g. Nederland, CO"
            required
            />
            <br/>
            <h3 className="font-weight-bold main-sub-header">How far?</h3>
            <label htmlFor="maximum-distance"><h5>Maximum distance</h5></label>
            <br/>
            <input 
            className="" 
            type="range" 
            min="1" 
            max="20" 
            id="maximum-distance"
            onChange={props.distanceChangeHandler}
            value={props.distance}
            />
            <p>{props.distance} miles</p>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
);

export default SearchForm;
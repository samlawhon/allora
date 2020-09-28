import React, { useState } from 'react';

const SearchForm = props => {
    const [searchVal, setSearchVal] = useState(null);
    const [distVal, setDistVal] = useState(null);
    
    return (
        <div>
            <h3 className="font-weight-bold main-sub-header">Where to?</h3>
            <form onSubmit={ e => props.submitHandler(e, searchVal) }>
                <h5>Search by city, trail or route</h5>
                <input 
                className="form-control form-text" 
                onChange={e => setSearchVal(e.target.value)} 
                type="text" 
                name="location" 
                id="search-bar" 
                placeholder="e.g. Nederland, CO"
                required
                />
                <br/>
                <h3 className="font-weight-bold main-sub-header">How far?</h3>
                <h5>Maximum distance</h5>
                <input className="" type="range" min="1" max="20" onChange={e => setDistVal(e.target.value)} value={distVal ? distVal : 10}/>
                <p>{distVal ? distVal : 10} miles</p>
                <br/>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default SearchForm;
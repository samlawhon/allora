import React, { Component } from 'react';

class SearchForm extends Component {
    
    render() {
        return (
            <div>
                <h3 className="font-weight-bold main-sub-header">Where to?</h3>
                <br/>
                <br/>
                <br/>
                <form onChange={ this.props.changeHandler } onSubmit={ this.props.submitHandler }>    
                    <h5>Activity type</h5>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-secondary pl-4 pr-4">Hike</button>
                        <button type="button" className="btn btn-secondary pl-4 pr-4">Run</button>
                        <button type="button" className="btn btn-secondary pl-4 pr-4">Bike</button>
                    </div>
                    <br/>
                    <br/>
                    <h5>Search by city, trail or route</h5>
                    <input className="form-control form-text" type="text" name="location" id="search-bar" placeholder="e.g. Nederland, CO"/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default SearchForm;
import React, { Component } from 'react';

class SearchForm extends Component {
    
    render() {
        return (
            <div>
                <h3 className="font-weight-bold main-sub-header">Where to?</h3>
                <h5>Search by city or trail</h5>
                <br/>
                <form onChange={ this.props.changeHandler } onSubmit={ this.props.submitHandler }>
                    <label for="date">Date:</label>
                    <br/>
                    <input className="form control" type="Date" value="2020-08-09" id="date"></input>
                    <br/>
                    <br/>
                    <label for="search-bar">Location: </label>
                    <br/>
                    <input className="form-control form-text" type="text" name="location" id="search-bar" placeholder="Nederland, CO"/>
                    <br/>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default SearchForm;
import React, {Component} from 'react';

class RoutesMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderMap() {
        console.log("hit render map");
        if (this.props.havePlace===true) {
            return (
              <p>I've got a map!</p>
            );
        }
        else {
            return (
                <p>I'm a sadboi with no map...and an ellipses using boomer</p>
            );
        }
    }

    render() {
        console.log("hit render");
        return (
            <div>
                {this.renderMap()}
            </div>
        );
    }
}

export default RoutesMap;

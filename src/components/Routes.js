import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

const createRouteCard = ({image, name, rating}) => (
    <Card>
        <CardImg src={image}/>
        <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText>{rating}</CardText>
        </CardBody>
    </Card>
)

class Routes extends Component {

    constructor(props) {
        super(props)

        this.state = {
            trails: null
        }
    }

    componentDidMount() {
        const data = {
            city_name: 'Nederland, CO',
            distance: 30
        }
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data)
        }

        fetch('/trails', requestOptions).then(response => response.json()).then(data => this.setState({trails: data}));
    }

    render() {
        if (this.state.trails!=null) {
            if (this.state.trails!='500') {
                return (
                    <div>
                    {this.state.trails.map(createRouteCard)}
                    </div>
                );
            }
            else {
                alert("Can't find location");
            }
        }
        else {
            return (
                <></>
            );
        }
    }
}

export default Routes;

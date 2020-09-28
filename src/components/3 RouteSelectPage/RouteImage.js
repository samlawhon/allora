import React, { Component, Fragment } from 'react';
import { Col } from 'reactstrap';

class RouteImage extends Component {

    constructor(props) {

        super(props);

        this.IMAGESIZE = '800x400';
        this.FIELDOFVIEW = '120';

        this.state = {
            imageUrl: null
        }
    }

    updateUrl() {
        const metadataAPI = new URL('https://maps.googleapis.com/maps/api/streetview/metadata');
        const metadataParams = {
            location: `${this.props.lat},${this.props.lng}`,
            key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        }
        metadataAPI.search = new URLSearchParams(metadataParams).toString();
        fetch(metadataAPI).then(response => response.json()).then(data => {
            if (data.status !== "ZERO_RESULTS") {
                const streetviewAPI = new URL('https://maps.googleapis.com/maps/api/streetview');
                const params = {
                    location: `${this.props.lat},${this.props.lng}`,
                    size: this.IMAGESIZE,
                    fov: this.FIELDOFVIEW,
                    key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                }
                streetviewAPI.search = new URLSearchParams(params).toString();
                this.setState({imageUrl: streetviewAPI.href});
            }
            else{
                this.setState({imageUrl: null});
            }
        });
    }

    componentDidMount() {
        this.updateUrl();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.lat !== this.props.lat && prevProps.lng !== this.props.lng) {
            this.updateUrl();
        }
    }

    render() {
        if (this.state.imageUrl) {
            return (
                <Fragment>
                    <Col lg="4">
                        <h1 className="display-4 image-heading">
                            Scenery in the area:
                        </h1>
                    </Col>
                    <Col lg="8">
                        <img 
                        src={this.state.imageUrl}
                        alt="Scenery at high point of route"/>
                    </Col>
                </Fragment>
            );
        }
        else {
            return (
                <Fragment></Fragment>
            )
        }
    }
}

export default RouteImage;
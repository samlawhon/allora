import React, { useState, useRef, useEffect, Fragment } from 'react';
import { Col } from 'reactstrap';

const RouteImage = props =>  {

    const IMAGESIZE = '800x400';
    const FIELDOFVIEW = '120';

    const [imageURL, setImageURL] = useState(null);

    const updateUrl = () => {
        const metadataAPI = new URL('https://maps.googleapis.com/maps/api/streetview/metadata');
        const metadataParams = {
            location: `${props.lat},${props.lng}`,
            key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
        }
        metadataAPI.search = new URLSearchParams(metadataParams).toString();
        fetch(metadataAPI).then(response => response.json()).then(data => {
            if (data.status !== "ZERO_RESULTS") {
                const streetviewAPI = new URL('https://maps.googleapis.com/maps/api/streetview');
                const params = {
                    location: `${props.lat},${props.lng}`,
                    size: IMAGESIZE,
                    fov: FIELDOFVIEW,
                    key: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                }
                streetviewAPI.search = new URLSearchParams(params).toString();
                setImageURL(streetviewAPI.href);
            }
            else{
                setImageURL(null);
            }
        });
    }

    const data = useRef();

    useEffect(() => {
        if (!data.current || (data.current.lat !== props.lat && data.current.lng !== props.lng)) {
            updateUrl();
            data.current = {
                lat: props.lat,
                lng: props.lng
            }
        }
    });

    const image = (
        <Fragment>
            <Col lg="4">
                <h1 className="display-4 image-heading">
                    Scenery in the area:
                </h1>
            </Col>
            <Col lg="8">
                <img 
                src={imageURL}
                alt="Scenery at high point of route"/>
            </Col>
        </Fragment>
    );

    return imageURL ? image : <Fragment></Fragment>
}

export default RouteImage;
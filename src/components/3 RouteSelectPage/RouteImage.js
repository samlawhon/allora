import React, { useState, useEffect, Fragment } from 'react';
import { Col } from 'reactstrap';

const RouteImage = props =>  {

    const IMAGESIZE = '800x400';
    const FIELDOFVIEW = '120';

    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        
        const payload = new URLSearchParams({
            lat: props.lat,
            lng: props.lng
        });

        fetch(`/image-meta-data?${payload}`).then(response => response.json()).then(data => {
            if (data.status !== "ZERO_RESULTS") {

                const payload = new URLSearchParams({
                    lat: props.lat,
                    lng: props.lng,
                    size: IMAGESIZE,
                    fov: FIELDOFVIEW
                });

                setImageURL(`/image?${payload}`);
            }
            else{
                setImageURL(null);
            }
        });
    }, [props.lat, props.lng]);

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
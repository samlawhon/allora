import React, { useState, useEffect } from 'react';
import './RouteSelectPage.css';

const BadWeatherCase = props => {
    
    const [lowestTemp, setLowestTemp] = useState(undefined);

    useEffect(() => {
        const payload = new URLSearchParams({
            ...props
        });

        fetch(`/api/coldest-weather?${payload}`)
        .then(response => response.json())
        .then(lowestTemp => setLowestTemp(lowestTemp))
        .catch(() => setLowestTemp('unavailable'));
    }, [props]);

    const renderBadCaseImage = () => {
        
        let message, link;
        if (lowestTemp < 25) {
            message = `Prepare for extreme cold, with temperatures as low as ${lowestTemp}`
            link = "https://images.unsplash.com/photo-1502809027077-657ca9c746af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }
        else if (25 <= lowestTemp && lowestTemp < 40) {
            message = `Prepare for cold temperatures as low as ${lowestTemp}`
            link = "https://images.unsplash.com/photo-1516573454759-d43e4d43dce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }
        else if (40 <= lowestTemp && lowestTemp < 55) {
            message = `Prepare for chilly temperatures as low as ${lowestTemp}`
            link = "https://images.unsplash.com/photo-1536105761318-666e135000d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }
        else {
            message = `Prepare for temperatures as cool as ${lowestTemp}`
            link = "https://images.unsplash.com/photo-1521860253737-a33db0898cc5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
        }

        return (
            <div className="RoutePageSubHeadings">
                <h5>{message}</h5>
                <img className="img-fluid" src={link} alt="People hiking in cold weather"/>
            </div>
        )
    }

    if (lowestTemp === undefined) {
        return <p>Realistic bad weather case loading</p>
    }
    else if (lowestTemp === 'unavailable') {
        return <p>Realistic bad weather case unavailable</p>
    }

    return renderBadCaseImage() 
}

export default BadWeatherCase;
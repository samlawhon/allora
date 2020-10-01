import React from 'react';
import { Polyline, Popup } from 'react-leaflet';
import { Button } from 'reactstrap';

const Route = props => {

    const selected = props.highlightedRoutes.has(props.name);

    const [weight, color] = selected ? ["8", "#52e3bc"] : ["4", "#e55934"];

    let routeSelectButton;
    if (!props.creatingMode) {
        routeSelectButton = (
            <Button 
            color="info" 
            onClick={event => {
                props.handleRouteSelect(event, props.name, props.positions, props.distance);
            }}
            >
                take me there
            </Button>
        );
    }

    const handleClick = () => {
        if (selected) {
            const replacementSet = new Set();
            props.highlightedRoutes.forEach(trail => {
                if (trail !== props.name) {
                    replacementSet.add(trail)
                }
            });
            props.setHighlightedRoutes(replacementSet);
        }
        else if (props.creatingMode) {
            props.setHighlightedRoutes( new Set([...props.highlightedRoutes, props.name]) );
        }
        else {
            props.setHighlightedRoutes( new Set([props.name]) );
        }
    }

    return (
        <Polyline
        weight={weight}
        color={color}
        onmouseover={event => event.target.setStyle({
            weight: String(2*Number(weight))
        })} 
        onmouseout={event => event.target.setStyle({
            weight: weight
        })}
        positions={props.positions}
        key={props.name}
        onClick={handleClick}
        >
            <Popup
            onClose={() => props.creatingMode ? null : props.setHighlightedRoutes( new Set() )}
            >
                <h3>{props.name}</h3>
                <h5>{props.distance.toFixed(2)} miles</h5>
                {routeSelectButton}
            </Popup>
        </Polyline>
    );

}

export default Route;
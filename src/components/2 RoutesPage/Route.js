import React from 'react';
import { Polyline, Tooltip } from 'react-leaflet';

const Route = props => {

    const selected = props.highlightedRoutes.has(props.name);

    const [weight, color] = selected ? ["8", "#52e3bc"] : ["4", "#e55934"];

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
            <Tooltip>
                <h3>{props.name}</h3>
                <h5>{props.distance.toFixed(2)} miles</h5>
            </Tooltip>
        </Polyline>
    );

}

export default Route;
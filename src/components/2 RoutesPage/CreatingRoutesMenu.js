import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import ReactTooltip from 'react-tooltip';

const CreatingRoutesMenu = props => (
    <Row>
        <Col xs="6">
            <Button 
            onClick={()=>{
                const trailsToJoin = [];
                props.highlightedRoutes.forEach((trailName) => trailsToJoin.push(props.trailCoords[trailName]));
                Object.keys(props.drawnRoutes).forEach(layerId => trailsToJoin.push({coords: props.drawnRoutes[layerId]}));
                props.handleJoinedRouteSelect("Joined Route", trailsToJoin);
            }}
            color="success"
            >
                Analyze
            </Button>
        </Col>
        <Col xs="1" className="info-icon">
            <img 
            src="https://img.icons8.com/material-outlined/24/000000/info.png" 
            alt="information icon"
            data-tip
            data-for='create-trails-info'
            />
            <ReactTooltip 
            id='create-trails-info' 
            type='info'
            place='bottom'
            >
                <ul>
                    <li><em>Join segments</em> by clicking on them</li>
                    <li><em>Draw your own</em> with the drawing menu (top right of map)</li>
                    <li><em>Analyze your route!</em></li>
                </ul>
            </ReactTooltip>
        </Col>
        <Col xs="4">
            <Button 
            onClick={props.closeHandler}
            >
                X
            </Button>
        </Col>
    </Row>
);

export default CreatingRoutesMenu;
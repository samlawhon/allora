import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import CreatingRoutesMenu from './CreatingRoutesMenu';

const MapMenu = props => {

    const constructCreatingRoutesMenu = () => (
        <CreatingRoutesMenu
        highlightedRoutes={props.highlightedRoutes}
        handleJoinedRouteSelect={props.handleJoinedRouteSelect}
        drawnRoutes={props.drawnRoutes}
        trailCoords={props.trailCoords}
        closeHandler={()=>{
            props.setCreatingMode(false);
            props.setHighlightedRoutes( new Set() );
        }}
        />
    );

    let analyzeButton;
    if (props.highlightedRoutes.size > 0) {
        analyzeButton = (
            <Button 
            onClick={event => {
                const name = props.highlightedRoutes.keys().next().value;
                const { coords, distance } = props.trailCoords[name];
                props.handleRouteSelect(event, name, coords, distance);
            }}
            color="success"
            >
                Analyze
            </Button>
        );
    }

    const defaultMenu = (
        <Row>
            <Col xs="6">
                {analyzeButton}
            </Col>
            <Col xs="6">
                <Button onClick={() => props.setCreatingMode(true)}>Create trail</Button>
            </Col>
        </Row>
    )
    
    const creatingRoutesMenu = props.creatingMode ? constructCreatingRoutesMenu() : defaultMenu;

    return (
        <Container>
            <Row>
                <Col xs="3" className="refresh-trails">
                    <Button onClick={() => props.resetTrailCoords(props.viewport)}>Refresh trails</Button>
                </Col>
                <Col xs="9" className="drawing-controls">
                    {creatingRoutesMenu}
                </Col>
            </Row>
        </Container>
    );
}

export default MapMenu;
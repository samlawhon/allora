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

    const createTrailButton = <Button onClick={() => props.setCreatingMode(true)}>Create trail</Button>;
    
    const creatingRoutesMenu = props.creatingMode ? constructCreatingRoutesMenu() : createTrailButton;

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
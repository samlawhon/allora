import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, Popup, Polyline, Marker, FeatureGroup } from 'react-leaflet';
import { Container, Row, Col, Button } from "reactstrap";
import { EditControl } from 'react-leaflet-draw';
import ReactTooltip from 'react-tooltip';
import './RoutesMap.css';

class RoutesMap extends Component {

    constructor(props) {
        super(props);

        this.viewport = null;
        this.state = {
            creatingTrailMode: false,
            joinedRoutes: new Set(),
            drawnRoutes: {},
        }
    }

    addTrailMarkers = ({lat, lon}) => (
        <Marker position={[lat, lon]}>
            <Popup>
               Hiking project recommends!
            </Popup>
        </Marker>   
    )

    addRoutes = (routeName) => (
        <Polyline 
        weight="4" 
        color="#e55934" 
        onmouseover={(event) => {event.target.setStyle({weight: 6})}} 
        onmouseout={(event) => {event.target.setStyle({weight: 3})}}
        positions={this.props.trailCoords[routeName].coords}
        key={routeName}
        >
            <Popup>
                <h3>{routeName}</h3>
                <h5>{this.props.trailCoords[routeName].distance.toFixed(2) + " miles"}</h5>
                <Button 
                color="info" 
                onClick={(event) => {
                    let name = routeName;
                    let positions = this.props.trailCoords[routeName].coords;
                    let distance = this.props.trailCoords[routeName].distance;
                    this.props.handleRouteSelect(event, name, positions, distance);
                }}
                >
                    take me there
                </Button>
            </Popup>
        </Polyline>
    )

    addRoutesforDrawing(routeName) {

        const [weight, color] = this.state.joinedRoutes.has(routeName) ? ["8", "#52e3bc"] : ["4", "#e55934"]
        
        const handleClick = () => {
            if (this.state.joinedRoutes.has(routeName)) {
                const replacementSet = new Set()
                this.state.joinedRoutes.forEach(trail => {
                    if (trail !== routeName) {
                        replacementSet.add(trail)
                    }
                });
                this.setState({joinedRoutes: replacementSet});
            }
            else {
                this.setState({joinedRoutes: new Set([...this.state.joinedRoutes, routeName])})
            }
        }

        return (
            <Polyline 
            weight={weight}
            color={color} 
            onmouseover={(event) => {event.target.setStyle({weight: String(2*Number(weight))})}} 
            onmouseout={(event) => {event.target.setStyle({weight: weight})}}
            positions={this.props.trailCoords[routeName].coords}
            key={routeName}
            onClick={handleClick}
            >
                <Popup>
                    <h3>{routeName}</h3>
                    <h5>{this.props.trailCoords[routeName].distance.toFixed(2) + " miles"}</h5>
                </Popup>
            </Polyline>
        );
    }

    constructCreatingRoutesMenu() {
        if (this.state.creatingTrailMode) {
            return (
                <Row>
                    <Col xs="6">
                        <Button onClick={()=>{
                            let trailsToJoin = [];
                            this.state.joinedRoutes.forEach((trailName) => trailsToJoin.push(this.props.trailCoords[trailName]));
                            console.log(trailsToJoin);
                            const drawnRoutesProcessed = [];
                            Object.keys(this.state.drawnRoutes).forEach(layerId => drawnRoutesProcessed.push({coords: this.state.drawnRoutes[layerId]}));
                            trailsToJoin = trailsToJoin.concat(drawnRoutesProcessed);
                            this.props.handleJoinedRouteSelect("Joined Route", trailsToJoin);
                        }}>analyze route</Button>
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
                        onClick={()=>this.setState({
                            creatingTrailMode: false,
                            joinedRoutes: new Set()
                        })}
                        >
                            X
                        </Button>
                    </Col>
                </Row>
            );
        }
        else {
            return <Button onClick={() => {this.setState({creatingTrailMode: true})}}>Create trail</Button>;
        }
    }

    constructRoutes() {
        if (this.state.creatingTrailMode) {
            return Object.keys(this.props.trailCoords).map((routeName) => this.addRoutesforDrawing(routeName));
        }
        else {
            return Object.keys(this.props.trailCoords).map((routeName) => this.addRoutes(routeName));
        }
    }

    constructDrawingTools() {
        if (this.state.creatingTrailMode) {
            return (
                <FeatureGroup>
                    <EditControl
                    position='topright'
                    onEdited={e => {
                        const replacement = {
                            ...this.state.drawnRoutes
                        }
                        Object.entries(e.layers._layers).forEach(entry => {
                            const [layerId, layerValue] = entry;
                            replacement[layerId] = layerValue.editing.latlngs[0];
                        });
                        this.setState({drawnRoutes : replacement});
                    }}
                    onCreated={e => {
                        e.layer.setStyle({
                            color: "#52e3bc",
                            weight: 8,
                            fill: false,
                            opacity: 1
                        });
                        const replacement = {
                            ...this.state.drawnRoutes,
                            [e.layer._leaflet_id]: e.layer.editing.latlngs[0]
                        }
                        this.setState({drawnRoutes: replacement});
                    }}
                    onDeleted={e => {
                        const replacement = {
                            ...this.state.drawnRoutes
                        }
                        Object.keys(e.layers._layers).forEach(layerId => {
                            delete replacement[layerId];
                        })
                        this.setState({drawnRoutes: replacement});

                    }}
                    draw={{
                        rectangle: false,
                        polygon: false,
                        circle: false,
                        marker: false,
                        circlemarker: false,
                        polyline: {
                            metric: false
                        }
                    }}
                    />
                </FeatureGroup>
            );
        }
    }

    render() {
        if (this.props.coords!==null && this.props.trailCoords!==null) {
            const { lat, lon } = this.props.coords;
            const marker = this.props.marker ? this.addTrailMarkers(this.props.marker) : "";
            const creatingRoutesMenu = this.constructCreatingRoutesMenu();
            const routes = this.constructRoutes();
            const drawingTools = this.constructDrawingTools();
            return (
                <div>
                    <Container>
                        <Row>
                            <Col xs="3" className="refresh-trails">
                                <Button onClick={() => this.props.resetTrailCoords(this.viewport)}>Refresh trails</Button>
                            </Col>
                            <Col xs="9" className="drawing-controls">
                                {creatingRoutesMenu}
                            </Col>
                        </Row>
                    </Container>
                    <LeafletMap
                    center={[lat, lon]}
                    zoom={this.props.mapZoom}
                    maxZoom={20}
                    attributionControl={true}
                    zoomControl={false}
                    doubleClickZoom={true}
                    scrollWheelZoom={true}
                    dragging={true}
                    animate={true}
                    easeLinearity={0.35}
                    onViewportChange={(viewport) => {
                        this.viewport = {
                            lat: viewport.center[0],
                            lon: viewport.center[1],
                            zoom: viewport.zoom
                        };
                    }}
                    >
                        <TileLayer
                        url={'https://api.mapbox.com/styles/v1/samlawhon/ckemud3i82mxx19k20rt83av2/tiles/256/{z}/{x}/{y}@2x?access_token='+String(process.env.REACT_APP_MAPBOX_API_KEY)}
                        attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>"
                        />
                        {routes}
                        {marker}
                        {drawingTools}
                    </LeafletMap>
                </div>
            );
        }
        else {
            return (
                <LeafletMap
                center={[40, -100]}
                zoom={3}
                maxZoom={20}
                attributionControl={true}
                zoomControl={false}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
                className="m-4"
                >
                    <TileLayer
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                </LeafletMap>
            );
        }
    }
}

export default RoutesMap

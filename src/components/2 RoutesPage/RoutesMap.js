import React, {Component} from 'react'
import { Map as LeafletMap, TileLayer, Popup, Polyline } from 'react-leaflet';
import { Container, Row, Col, Button } from "reactstrap";
import './RoutesMap.css';

class RoutesMap extends Component {

    constructor(props) {
        super(props);

        this.viewport = null;
    }

    // addTrailMarkers = ({image, maxElev, name, lat, lng}) => (
    //     <Marker position={[lat, lng]} data-img_link={image} data-name={name} data-maxelev={maxElev} 
    //     data-lat={lat} data-lng={lng} onClick={this.props.handleRouteSelect}>
    //         <Popup>
    //            {name}
    //         </Popup>
    //     </Marker>   
    // )

    addRoutes = (routeName) => (
        <Polyline 
            weight="4" 
            color="#e55934" 
            onmouseover={(event) => {event.target.setStyle({weight: 6})}} 
            onmouseout={(event) => {event.target.setStyle({weight: 3})}}
            positions={this.props.trailCoords[routeName]}
            >
            <Popup>
                {routeName}
            </Popup>
        </Polyline>
    )

    render() {
        if (this.props.coords!==null && this.props.trailCoords!==null && this.props.trails!==null) {
            let lat = this.props.coords['lat'];
            let lon = this.props.coords['lon'];
            return (
                <div>
                    <Container>
                        <Row>
                            <Col xs="6" className="refresh-trails">
                                <Button onClick={() => this.props.resetTrailCoords(this.viewport)}>Refresh trails</Button>
                            </Col>
                            <Col xs="6" className="drawing-controls">
                                <Button>Create trail</Button>
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
                        {Object.keys(this.props.trailCoords).map(this.addRoutes)}
                        {/* {this.props.trails.map(this.addTrailMarkers)} */}
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

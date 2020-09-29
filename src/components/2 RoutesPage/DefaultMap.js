import React from 'react';
import {Map as LeafletMap, TileLayer } from 'react-leaflet';

const DefaultMap = () => (
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

export default DefaultMap;
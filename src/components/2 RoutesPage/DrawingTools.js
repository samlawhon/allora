import React from 'react';
import { EditControl } from 'react-leaflet-draw';
import { FeatureGroup } from 'react-leaflet';

const DrawingTools = props => (
    <FeatureGroup>
        <EditControl
        position='topright'
        onEdited={e => {
            const replacement = {
                ...props.drawnRoutes
            }
            Object.entries(e.layers._layers).forEach(entry => {
                const [layerId, layerValue] = entry;
                replacement[layerId] = layerValue.editing.latlngs[0];
            });
            props.updateDrawnRoutes(replacement);
        }}
        onCreated={e => {
            e.layer.setStyle({
                color: "#52e3bc",
                weight: 8,
                fill: false,
                opacity: 1
            });
            const replacement = {
                ...props.drawnRoutes,
                [e.layer._leaflet_id]: e.layer.editing.latlngs[0]
            }
            props.updateDrawnRoutes(replacement);
        }}
        onDeleted={e => {
            const replacement = {
                ...props.drawnRoutes
            }
            Object.keys(e.layers._layers).forEach(layerId => {
                delete replacement[layerId];
            })
            props.updateDrawnRoutes(replacement);

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

export default DrawingTools;
import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import './RouteSelectPage.css';

const CreateChart = props => {

    let data = [{
        "id": "elevation",
        "color": "#095D42",
        "data": props.data
    }]
    
    return (
        <ResponsiveLine
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        data={data}
        xScale={{type: 'linear' }}
        yScale={{type: 'linear', min: 'auto', max: 'auto', reverse: false}}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Distance (mi)',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Elevation (ft)',
            legendOffset: -45,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        enablePoints={false}
        useMesh={true}
        >
        </ResponsiveLine>
    );
}

export default CreateChart;

import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationMarker from './LocationMarker';
import LocationInfo from './LocationInfo';
import './tracker.css';

const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS}`;

/** 
 * Our Google Map component with key, default center and zoom level. Here we pass down the eventData to our LocationMarker component, which will render a marker for each event.
 * 
 * 
 * 
 */
const Map = ({ eventData, center, zoom }) => {
	const [ locationInfo, setLocationInfo ] = useState(null);

	const markers = eventData.map((ev) => {
		if (ev.categories[0].id === 'wildfires') {
			return (
				<LocationMarker
					key={ev.id}
					lat={ev.geometry[0].coordinates[1]}
					lng={ev.geometry[0].coordinates[0]}
					onClick={() => setLocationInfo({ id: ev.id, title: ev.title })}
				/>
			);
		}
		return null;
	});

	return (
		<div className="map">
			<GoogleMapReact bootstrapURLKeys={{ key: `${API_KEY}` }} defaultCenter={center} defaultZoom={zoom}>
				{markers}
			</GoogleMapReact>
			{locationInfo && <LocationInfo locationInfo={locationInfo} />}
		</div>
	);
};

Map.defaultProps = {
	center: {
		lat: 40.3265,
		lng: -122.8756
	},
	zoom: 6
};

export default Map;

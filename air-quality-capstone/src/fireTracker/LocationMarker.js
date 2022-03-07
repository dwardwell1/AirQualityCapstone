import React from 'react';
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/fire-alert';

const LocationMarker = ({ onClick }) => {
	/**
 * simple iconify icon to mark the location of the fire on our google map
 */

	return (
		<div className="location-marker" onClick={onClick}>
			<Icon icon={locationIcon} className="location-icon" />
		</div>
	);
};

export default LocationMarker;

import React from 'react';

const LocationInfo = ({locationInfo}) => {
   
    /**
     * Our locationInfo object will be passed in as a prop from the parent component, and will be a popover that will display
     * the location name, address, and coordinates.
     */
    return (
        <div className="location-info">
        <h2>Event Location Information</h2>
        <ul>
            <li>ID: <strong> {locationInfo.id}</strong> </li>
            <li>TITLE: <strong> {locationInfo.title}</strong> </li>
        </ul>
        </div>
    );
    }


export default LocationInfo;
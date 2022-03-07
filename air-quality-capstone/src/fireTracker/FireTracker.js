import React, { useState, useEffect } from 'react';
import Map from './Map';
import fireApi from '../api/fireApi';
import CardLoad from '../common/CardLoad';

function FireTracker() {
	/**
	 * Hit our NASA fire API to get the latest fire data.
	 * returns out eventData, which we extact location data from to pass down to our Map
	 * 
	 */
	const [ eventData, setEventData ] = useState([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		const fetchEvents = async () => {
			setLoading(true);
			const { events } = await fireApi.getEvents();

			setEventData(events);

			setLoading(false);
		};
		fetchEvents();
	}, []);
	return (
		<div className="tracker">
			<div className="tracker-header">{!loading ? <Map eventData={eventData} /> : <CardLoad />}</div>
		</div>
	);
}

export default FireTracker;

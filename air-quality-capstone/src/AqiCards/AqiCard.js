import React, { useState, useEffect } from 'react';
import AqApi from '../api/aqApi';
import CardLoad from '../common/CardLoad';
import './AqiCard.css';

/** AQI Detail page.
 *
 * Renders information about zip codes API,
 *
 */

function AqiCard({ zip }) {
	console.debug('AqiDetail', 'zip=', zip);

	const [ aqi, setAqi ] = useState(null);

	useEffect(
		function getAqiForZip() {
			async function getAqi() {
				try {
					setAqi(await AqApi.getAqi(zip));
				} catch (err) {
					console.error(err);
				}
			}

			getAqi();
		},
		[ zip ]
	);

	if (!aqi) return <CardLoad />;

	return (
		<div className="jumbotron jumbtron-fluid mx-auto " style={{ width: '700px' }}>
			{console.log('aqi', aqi)}
			{aqi[1] ? (
				<div className="">
					<div className="container" className="mx-auto">
						<h2>Reporting Location: {aqi[1].ReportingArea}</h2>
						<hr className="mx-auto" />
						<h4 className="mx-auto">Current AQI: {aqi[1].AQI}</h4>
						<h4 className="mx-auto">How's my Air Quality?: {aqi[1].Category.Name}</h4>
					</div>
				</div>
			) : (
				<h4>No data for this zipcode</h4>
			)}
		</div>
	);
}

export default AqiCard;

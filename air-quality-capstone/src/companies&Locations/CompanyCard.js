import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AirQualApi from '../api/aqApi';
import dbApi from '../api/dbApi';

import './CompanyCard.css';

/** Show limited information about a company
 *
 * Is rendered by CompanyList to show a "card" for each company.
 *
 * CompanyList -> CompanyCard
 */

function CompanyCard({ locationId }) {
	console.debug('CompanyCard');

	const [ aqi, setAqi ] = useState(null);

	useEffect(function getAqiOnMount() {
		console.debug('SubList useEffect getSubsOnMount');
		getApi();
	}, []);

	async function getApi() {
		let location = dbApi.getLocation(locationId);
		let aqiData = await AirQualApi.getAqiData(location.zipcode);
		console.log(aqiData);
		setAqi(aqiData);
	}

	return (
		// <Link className="CompanyCard card" to={`/companies/${handle}`}>
		<Link className="CompanyCard card" to={`/`}>
			<div className="card-body">
				<h6 className="card-title">{aqi}</h6>
				<p>
					<small>{aqi}</small>
				</p>
			</div>
		</Link>
	);
}

export default CompanyCard;

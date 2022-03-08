import React, { useState, useEffect, useContext } from 'react';
import dbApi from '../api/dbApi';
import AqiCard from './AqiCard';
import UserContext from '../auth/UserContext';

/** Show page with list of Location Subscriptions (to be implemented later).
 *
 * On mount, loads AQIs from API.
 *
 *

 */

function SubsList() {
	console.debug('SubsList');
	const { currentUser } = useContext(UserContext);

	const [ subs, setSubs ] = useState(null);

	useEffect(function getSubsOnMount() {
		console.debug('SubList useEffect getSubsOnMount');
		gatherSubs();
	}, []);

	async function gatherSubs() {
		let subbyTest = currentUser.locations;
		let holder = [];
		for (let sub of subbyTest) {
			let zip = await dbApi.getLocation(sub);
			holder.push(zip.zipcode);
		}
		//Here we push the current users default locale before we implement our multiple location subscribing
		holder.push(currentUser.defaultLocale);
		setSubs(holder);
	}

	if (!subs) return <cardLoad />;

	return (
		<div className=" col-md-8 offset-md-2">
			{subs.length ? (
				<div className=" mt-5">{subs.map((z) => <AqiCard zip={z} key={z} />)}</div>
			) : (
				<p className="lead">Sorry, no results were found!</p>
			)}
		</div>
	);
}

export default SubsList;

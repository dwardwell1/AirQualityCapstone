import React, { useState, useEffect, useContext } from 'react';
import SearchForm from '../common/SearchForm';
import dbApi from '../api/dbApi';
import AirQualApi from '../api/aqApi';
import CompanyCard from './CompanyCard';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';

/** Show page with list of companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * This is routed to at /companies
 *
 * Routes -> { CompanyCard, SearchForm }
 */

//Use this to gather subscibed locations??

// function CompanyList() {
function SubsList() {
	// console.debug("CompanyList");
	console.debug('SubsList');
	const { currentUser } = useContext(UserContext);

	const [ subs, setSubs ] = useState(null);

	// useEffect(function getCompaniesOnMount() {
	//   console.debug("CompanyList useEffect getCompaniesOnMount");
	//   search();
	// }, []);
	useEffect(function getSubsOnMount() {
		console.debug('SubList useEffect getSubsOnMount');
		search();
	}, []);

	/** Triggered by search form submit; reloads companies. */
	// async function search(name) {
	//   let companies = await JoblyApi.getCompanies(name);
	//   setCompanies(companies);
	// }

	async function search(name) {
		let subbyTest = currentUser.locations;

		setSubs(subbyTest);
	}

	if (!subs) return <LoadingSpinner />;
	// if (!companies) return <LoadingSpinner />;

	return (
		<div className="CompanyList col-md-8 offset-md-2">
			<SearchForm searchFor={search} />
			{subs.length ? (
				<div className="CompanyList-list">
					{subs.map((c) => (
						<CompanyCard
							locationId={c}
							// userId={c.name}
							// emailAlerts={c.email_alerts}
						/>
					))}
				</div>
			) : (
				<p className="lead">Sorry, no results were found!</p>
			)}
		</div>
	);
}

export default SubsList;
// export default CompanyList;

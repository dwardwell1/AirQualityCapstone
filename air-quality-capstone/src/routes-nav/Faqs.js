import React from 'react';

function Freq() {
	return (
		<div
			className="masked px-5 py-5 mb-5 "
			style={{
				maxHeight: 'calc(100vh - 30vh)',
				overflowY: 'auto'
			}}
		>
			<div className="col-sm-12 basic-content">
				<div id="" className="col-xs-12 strip-padding overflow-y">
					<div className="col-xs-12" />
					<div className="col-sm-12">
						<p />

						<h3>What is the U.S. Air Quality Index (AQI)?</h3>

						<p>The U.S. AQI is EPA’s index for reporting air quality.</p>

						<h3>Why should I sign up for email alerts and what level should they be at?</h3>

						<p>
							Our email alert system sends your inbox a message including the information of your
							preferred ZIP code's air quality. You have a choice of what severity triggers the email
							response. We suggest unhealthy for sensitive groups but it is up to you if and when you want
							these emails.
						</p>

						<h3>How does the AQI work?</h3>

						<p>
							Think of the AQI as a yardstick that runs from 0 to 500. The higher the AQI value, the
							greater the level of air pollution and the greater the health concern. For example, an AQI
							value of 50 or below represents good air quality, while an AQI value over 300 represents
							hazardous air quality.
						</p>

						<p>
							For each pollutant an AQI value of 100 generally corresponds to an ambient air concentration
							that equals the level of the short-term national ambient air quality standard for protection
							of public health. AQI values at or below 100 are generally thought of as satisfactory. When
							AQI values are above 100, air quality is unhealthy: at first for certain sensitive groups of
							people, then for everyone as AQI values get higher.
						</p>

						<p>
							The AQI is divided into six categories. Each category corresponds to a different level of
							health concern. Each category also has a specific color. The color makes it easy for people
							to quickly determine whether air quality is reaching unhealthy levels in their communities.
						</p>
						<table className="table table-bordered">
							<caption>
								<strong>AQI Basics for Ozone and Particle Pollution</strong>
							</caption>
							<thead>
								<tr>
									<th scope="col">Daily AQI Color</th>
									<th scope="col">Levels of Concern</th>
									<th scope="col">Values of Index</th>
									<th scope="col">Description of Air Quality</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<strong>Green</strong>
									</td>
									<td>
										<strong>Good</strong>
									</td>
									<td>
										<strong>0 to 50</strong>
									</td>
									<td>
										<strong>
											Air quality is satisfactory, and air pollution poses little or no risk.
										</strong>
									</td>
								</tr>
								<tr>
									<td>
										<strong>Yellow</strong>
									</td>
									<td>
										<strong>Moderate</strong>
									</td>
									<td>
										<strong>51 to 100</strong>
									</td>
									<td>
										<strong>
											Air quality is acceptable. However, there may be a risk for some people,
											particularly those who are unusually sensitive to air pollution.
										</strong>
									</td>
								</tr>
								<tr>
									<td>
										<strong>Orange</strong>
									</td>
									<td>
										<strong>Unhealthy for Sensitive Groups</strong>
									</td>
									<td>
										<strong>101 to 150</strong>
									</td>
									<td>
										<strong>
											Members of sensitive groups may experience health effects. The general
											public is less likely to be affected.
										</strong>
									</td>
								</tr>
								<tr>
									<td>
										<strong>Red</strong>
									</td>
									<td>
										<strong>Unhealthy</strong>
									</td>
									<td>
										<strong>151 to 200</strong>
									</td>
									<td>
										<strong>
											Some members of the general public may experience health effects; members of
											sensitive groups may experience more serious health effects.
										</strong>
									</td>
								</tr>
								<tr>
									<td>
										<strong>Purple</strong>
									</td>
									<td>
										<strong>Very Unhealthy</strong>
									</td>
									<td>
										<strong>201 to 300</strong>
									</td>
									<td>
										<strong>
											Health alert: The risk of health effects is increased for everyone.
										</strong>
									</td>
								</tr>
								<tr>
									<td>
										<strong>Maroon</strong>
									</td>
									<td>
										<strong>Hazardous</strong>
									</td>
									<td>
										<strong>301 and higher</strong>
									</td>
									<td>
										<strong>
											Health warning of emergency conditions: everyone is more likely to be
											affected.
										</strong>
									</td>
								</tr>
							</tbody>
						</table>
						<p>
							See an{' '}
							<a href="https://www.airnow.gov/publications/activity-guides-publications/">
								Activity Guide
							</a>{' '}
							to learn ways to protect your health when the AQI reaches unhealthy levels. (Takes you to
							new website)
						</p>
						<p />
					</div>
					<div class="col-xs-12 strip-padding">
						<hr class="content-hr strip-margin" />
					</div>
				</div>
				<div id="" class="col-xs-12 strip-padding">
					<div class="col-xs-12" />
					<div class="col-sm-12">
						<p />
						<h3>Five major pollutants</h3>

						<p>
							EPA establishes an AQI for five major air pollutants regulated by the Clean Air Act. Each of
							these pollutants has a national air quality standard set by EPA to protect public health:
						</p>

						<ul>
							<li>ground-level ozone</li>
							<li>particle pollution (also known as particulate matter, including PM2.5 and PM10)</li>
							<li>carbon monoxide</li>
							<li>sulfur dioxide</li>
							<li>nitrogen dioxide</li>
						</ul>

						<p />
					</div>
					<div class="col-xs-12 strip-padding">
						<hr class="content-hr strip-margin" />
					</div>
					<h3>Fire not appearing on Firetracker?</h3>

					<p>
						We recieve our fire information from NASA's Earth Observatory Natural Even Tracker (EONET).
						Often times it takes a few days for natural events to register on their information. If a fire
						is close to you and is not listed on the tracker, your AQI search result should still be
						accurate.
					</p>
				</div>
			</div>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</div>
	);
}

export default Freq;

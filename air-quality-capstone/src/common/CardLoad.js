import React from 'react';

/** Loading message used by components that fetch API data. */

function CardLoad() {
	return (
		<div className="text-center mt-5">
			<div className="spinner-border" style={{ width: '3rem', height: '3rem' }}>
				<span className="sr-only">Air(Q)</span>
			</div>
		</div>
	);
}

export default CardLoad;

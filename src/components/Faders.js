import React from 'react';
import Fader from "../containers/Fader";

export default ({faders}) => (
		<div className="faders-container">
			{ faders.map( (fader, i) => (
				<Fader
					key={ i }
					id={ i }
				/>
			))}		
		</div>
)

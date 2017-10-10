import React from 'react';
import Knob from "../containers/Knob";

export default ({knobs}) => (
		<div>
			{ knobs.map( (knob, i) => (
				<Knob
					key={ i }
					id={ i }
				/>
			))}		
		</div>
)

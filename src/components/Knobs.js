// presentation so that it can go live? - choose port/channel/number of dials/labels...
// get list of available ports and populate a dropdown?
// add midi ctrl channels to state
// do more scaling of the data so that the knob could change size and it would all still function/less brittle - should be able to use this knob again and again in other apps.

import React, { Component } from 'react';
import Knob from "./Knob";

export default ({ knobs, label, mouseDown, mouseMove, mouseLeave }) => (
		<div>
			{ knobs.map( (knob, i) => (
				<Knob
					key={ i }
					id={ i }
					value={ knob.get('value') * 2.52 } // converts midi 0-127 to deg
					onMouseDown={ () => mouseDown(true) }
					onMouseMove={ (e) => mouseMove(e, i) }
       				onMouseUp={ () => mouseDown(false) }
       				onMouseLeave={ (e) => mouseLeave(e, i) }
       				label={ knob.get('label') }
				/>
			))}		
		</div>
)

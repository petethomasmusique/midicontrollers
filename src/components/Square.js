import React from 'react';
import '../css/output.css';

export default ({id, colour, onMouseUp, onMouseDown}) => (
	<div 
		id={'square-' + id}
		className="sequencer-square" 
		// onClick={ onClick }
		onMouseDown={ onMouseDown } 
		onMouseUp={ onMouseUp }
		>
		<div className="sequencer-square-inset" style={{background: colour }}></div>
	</div>
)
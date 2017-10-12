import React from 'react';
import '../css/output.css';

export default ({id, colour, onClick}) => (
	// function colour (velocity) {
	// 	if (velocity == 0) {
	// 		return '#A9A9A9';
	// 	}else if (velocity > 0 && velocity < 60) {
	// 		return colour =  '#D3D3D3';
	// 	} else if (velocity < 90) {
	// 		return colour = '#A9A9A9';
	// 	} else {
	// 		return colour = '#696969';
	// 	}
	// }
	
	<div id={'square-' + id}className="sequencer-square"  onClick={ onClick }>
		<div className="sequencer-square-inset" style={{background: colour }}></div>
	</div>
)
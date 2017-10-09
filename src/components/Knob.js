import React from 'react';
import '../css/output.css';

export default ({id, value, onMouseDown, onMouseMove, onMouseUp, onMouseLeave }) => (
	<div id={ "knob-" + id } className="knob-container">
		<div 
			className="knob-background" 
			onMouseDown={ onMouseDown } 
			onMouseUp={ onMouseUp } 
			onMouseMove={ onMouseMove } 
			onMouseLeave={ onMouseLeave} 
		>
		    <div className="face" style={{transform: "rotate(" + (value + 20)  + "deg)"}}>
		      <div className="position"></div>
		    </div>
		</div>
		<input type="text" name="label" className="knob-label"/>
	</div>
)
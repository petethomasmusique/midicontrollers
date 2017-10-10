import React from 'react';
import '../css/output.css';

export default ({id, knobs, mouseDown, updateDial, mouseLeave }) => (
	<div className="knob-container">
		<div
			id={ "knob-" + id } 
			className="knob-background" 
			onMouseDown={ () => mouseDown(true) } 
			onMouseMove={ (e) => updateDial(e, id) } 
			onMouseUp={ () => mouseDown(false) } 
			onMouseLeave={ (e) => mouseLeave(e, id)} 
		>
		    <div className="face" style={{transform: "rotate(" + ((knobs.getIn([id, 'value']) * 2.52) + 20)  + "deg)"}}>
		      <div className="position"></div>
		    </div>
		</div>
		<div className="knob-info">
			<div className="midi-channel"><small>{ knobs.getIn([id, 'channel']) }</small></div>
			<div className="knob-label">{ knobs.getIn([id, 'label']) }</div>
			<div className="midi-value"><small>{ knobs.getIn([id, 'value']) }</small></div>
		</div>
	</div>
)
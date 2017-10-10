import React from 'react';
import '../css/output.css';

export default ({id, faders, mouseDown, updateFader, updateFaderMouseLeave }) => (
	<div className="fader-container">
		<div
			id={ "fader-" + id } 
			className="fader-background" 
			onMouseDown={ () => mouseDown(true) } 
			onMouseMove={ (e) => updateFader(e, id) } 
			onMouseUp={ () => mouseDown(false) } 
			onMouseLeave={ (e) => updateFaderMouseLeave(e, id)} 
		>
		    <div className="fader-inset">
		      <div className="fader-position" style={{top: faders.getIn([id, 'value'])}}></div>
		    </div>
		</div>
		<div className="fader-info">
			<div className="midi-channel"><small>{ faders.getIn([id, 'channel']) }</small></div>
			<div className="fader-label">{ faders.getIn([id, 'label']) }</div>
			<div className="midi-value"><small>{ faders.getIn([id, 'value']) }</small></div>
		</div>
	</div>
)
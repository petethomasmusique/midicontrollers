import React from 'react';
import '../css/output.css';

export default ({id, faders, mouseDown, updateFader, updateFaderMouseLeave }) => (
	<div className="fader-container">
		<div 
			className="fader-background" 
			onMouseDown={ () => mouseDown(true) } 
			onMouseMove={ (e) => updateFader(e, id) } 
			onMouseUp={ () => mouseDown(false) } 
			onMouseLeave={ (e) => updateFaderMouseLeave(e, id)} 
		>
		    <div id={ "fader-" + id } className="fader-inset">
		      <div className="fader-position" style={{top: faders.getIn([id, 'value'])}}></div>
		    </div>
		</div>
		<div className="fader-info">
			<div className="midi-channel"><small>{ faders.getIn([id, 'channel']) }</small></div>
			<div className="fader-label">{ faders.getIn([id, 'label']) }</div>
			<div className="midi-value"><small>{ faders.getIn([id, 'midiValue']) }</small></div>
		</div>
	</div>
)
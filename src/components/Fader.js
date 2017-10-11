import React from 'react';
import '../css/output.css';

export default ({id, faders, mouseDown, updateFader, mouseLeave }) => (
	<div className="fader-container">
		<div 
			className="fader-background" 
			onMouseDown={ () => mouseDown(true) } 
			onMouseMove={ (e) => updateFader(e, id) } 
			onMouseUp={ () => mouseDown(false) } 
			onMouseLeave={ (e) => mouseLeave(e, id)} 
		>
		    <div id={ "fader-" + id } className="fader-inset">
		      <div className="fader-position" style={{top: faders.getIn([id, 'value'])}}></div>
		    </div>
		</div>
		<div className="fader-info">
			<div className="midi-channel">{ faders.getIn([id, 'channel']) }</div>
			<div className="midi-value">{ faders.getIn([id, 'midiValue']) }</div>
			<div className="fader-label">{ faders.getIn([id, 'label']) }</div>
		</div>
	</div>
)
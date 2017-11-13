import React from 'react';

export default ({availableMidiInputs, availableMidiOutputs, updateMidiDevice}) => (
	<div className="devices-container">
		<div className="midiInputs">
			<select onChange={ (e) => updateMidiDevice('input', e.target.value)}>
				<option></option>
				{ availableMidiInputs ? availableMidiInputs.map( (input, i) => (
					<option key={ i }>{input}</option>
				)) : null}
			</select>
			<p>Midi In</p>
		</div>
		
		<div className="midiOutputs">
			<select onChange={ (e) => updateMidiDevice('output', e.target.value)}>
				<option></option>
				{ availableMidiOutputs ? availableMidiOutputs.map( (output, i) => (
					<option key={ i }>{output}</option>
				)) : null}
			</select>
			<p>Midi Out</p>
		</div>
	</div>
)
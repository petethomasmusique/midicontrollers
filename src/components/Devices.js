import React from 'react';

export default ({availableMidiInputs, availableMidiOutputs, updateMidiDevice}) => (
	<div className="devices-container">
		<div className="midiInputs">
			<p>Midi In</p>
			<select onChange={ (e) => updateMidiDevice('input', e.target.value)}>
				<option></option>
				{ availableMidiInputs ? availableMidiInputs.map( (input, i) => (
					<option key={ i }>{input}</option>
				)) : null}
			</select>
		</div>
		
		<div className="midiOutputs">
			<p>Midi Out</p>
			<select onChange={ (e) => updateMidiDevice('output', e.target.value)}>
				<option></option>
				{ availableMidiOutputs ? availableMidiOutputs.map( (output, i) => (
					<option key={ i }>{output}</option>
				)) : null}
			</select>
		</div>
	</div>
)
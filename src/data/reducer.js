import initial from "./initial";
import WebMidi from '../../node_modules/webmidi';

import { UPDATE_MOUSEDOWN } from "./actions";
import { UPDATE_MOUSEMOVE } from "./actions";
import { UPDATE_MOUSELEAVE } from "./actions";

const updateMouseDown = (state, { bool }) => {
	return state.set("mouseDown", bool);
}
const updateMouseMove = (state, { event, id }) => {
    if (state.get('mouseDown')) {
		let knob = document.getElementById("knob-" + id);
		let knobInfo = knob.getBoundingClientRect();
      	let newValue = 127 - (event.clientY - knobInfo.y); // scale y co-ordinate depending on where the element is
        if (newValue < 0) {
        	sendMidi(id, 0);
        	return state.setIn(['knobs', id, 'value'], 0);
        } else if (newValue > 127) {
        	sendMidi(id, 127);
        	return state.setIn(['knobs', id, 'value'], 127);
        } else {
        	sendMidi(id, newValue);
        	return state.setIn(['knobs', id, 'value'], newValue);
        }
	}
	return state;
};

const updateMouseLeave = (state, { event, id }) => {
	if (state.get('mouseDown')) {
		if (state.getIn(['knobs', id, 'value']) > 120) {
			return state.setIn(['knobs', id, 'value'], 127).set('mouseDown', false);
		} else if (state.getIn(['knobs', id, 'value']) < 5) {
			return state.setIn(['knobs', id, 'value'], 0).set('mouseDown', false);
		}
  	}
  	return state;
}

const sendMidi = (id, val) => {
	WebMidi.enable(function(err) {
		if (!err) {
			this.midiOut = WebMidi.getOutputByName("to Max 1"); 
			this.midiOut.sendControlChange( id, val );
			WebMidi.disable();
		}
	});
}

export default (state = initial, action) => {
	switch (action.type) {
		case UPDATE_MOUSEDOWN: return updateMouseDown(state, action);
		case UPDATE_MOUSEMOVE: return updateMouseMove(state, action);
		case UPDATE_MOUSELEAVE: return updateMouseLeave(state, action);
		default: return state;
	}
};
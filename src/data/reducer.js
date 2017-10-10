import initial from "./initial";
import WebMidi from '../../node_modules/webmidi';

import { UPDATE_MOUSEDOWN } from "./actions";
import { UPDATE_DIAL } from "./actions";
import { UPDATE_DIALMOUSELEAVE } from "./actions";
import { UPDATE_FADER } from "./actions";
import { UPDATE_FADERMOUSELEAVE } from "./actions";

const updateMouseDown = (state, { bool }) => {
	return state.set("mouseDown", bool);
}
const updateDial = (state, { event, id }) => {
  if (state.get('mouseDown')) {
		let knob = document.getElementById("knob-" + id);
		let knobInfo = knob.getBoundingClientRect();
  		let newValue = Math.floor(127 - (event.clientY - knobInfo.y) * (127/knobInfo.height));
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

const updateDialMouseLeave = (state, { event, id }) => {
	if (state.get('mouseDown')) {
		if (state.getIn(['knobs', id, 'value']) > 120) {
			return state.setIn(['knobs', id, 'value'], 127).set('mouseDown', false);
		} else if (state.getIn(['knobs', id, 'value']) < 5) {
			return state.setIn(['knobs', id, 'value'], 0).set('mouseDown', false);
		}
	}
	return state;
}

const updateFader = (state, { event, id}) => {
	// TODO
	return state;
}

const updateFaderMouseLeave = (state, { event, id }) => {
	// TODO
	return state;
} 

// TODO can you combine the mouse leave into update function? Would it work to just run the update function on mouse

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
		case UPDATE_DIAL: return updateDial(state, action);
		case UPDATE_DIALMOUSELEAVE: return updateDialMouseLeave(state, action);
		case UPDATE_FADER: return updateFader(state, action);
		case UPDATE_FADERMOUSELEAVE: return updateFaderMouseLeave(state, action);
		default: return state;
	}
};
import initial from "./initial";
import WebMidi from '../../node_modules/webmidi';

import { UPDATE_MOUSEDOWN } from "./actions";
import { MOUSELEAVE } from "./actions";
import { UPDATE_DIAL } from "./actions";
import { UPDATE_FADER } from "./actions";
import { ONCLICK_SQUARE} from "./actions";

const updateMouseDown = (state, { bool }) => {
	return state.set("mouseDown", bool);
}
const mouseLeave = (state, { event, id }) => {
	if (state.get('mouseDown')) {
		return state.set('mouseDown', false);
	}
	return state;
} 
const updateDial = (state, { event, id }) => {
	console.log(state.toJS);
  	if (state.get('mouseDown')) {
		let knob = document.getElementById("knob-" + id);
		let knobInfo = knob.getBoundingClientRect();
  	let newValue = Math.floor(127 - (event.clientY - knobInfo.y) * (127/knobInfo.height));
	    if (newValue < 3) {
	    	sendMidi(id, 0);
	    	return state.setIn(['knobs', id, 'value'], 0);
	    } else if (newValue > 124) {
	    	sendMidi(id, 127);
	    	return state.setIn(['knobs', id, 'value'], 127);
	    } else {
	    	sendMidi(id, newValue);
	    	return state.setIn(['knobs', id, 'value'], newValue);
	    }
		}
	return state;
};

const updateFader = (state, { event, id}) => {
  if (state.get('mouseDown')) {
		let fader = document.getElementById("fader-" + id);
		let faderInfo = fader.getBoundingClientRect();
		let faderHeight = faderInfo.height - fader.childNodes[0].getBoundingClientRect().height; // takes into account size of fader notch
		let faderPosition = (event.clientY - faderInfo.y);
		let midiValue = 127 - Math.floor(faderPosition * (127/faderHeight));
		if (midiValue < 0) {
    	return setFader(state, id, faderHeight, 0);
    } else if (midiValue > 127) {
    	return setFader(state, id, 0, 127);
    } else {
    	return setFader(state, id, faderPosition, midiValue);
    }
	}
	return state;
}

const setFader = (state, id, value, midiValue) => {
	sendMidi(id, midiValue);
	return state.setIn(['faders', id, 'value'], value).setIn(['faders', id, 'midiValue'], midiValue);
}
// TODO can you combine the dial and fader update, passing in the type of component that it is?

const sendMidi = (id, val) => {
	WebMidi.enable(function(err) {
		if (!err) {
			this.midiOut = WebMidi.getOutputByName("to Max 1"); 
			this.midiOut.sendControlChange( id, val );
			WebMidi.disable();
		}
	});
}

const onClickSquare = (state, { id }) => {
	let square = state.getIn(['sequencer', id]);
	if (square.get('velocity') === 0) {
		return state.setIn(['sequencer', id, 'colour'], '#474747').setIn(['sequencer', id, 'velocity'], 127);
	}else if (square.get('velocity') === 127) {
		return state.setIn(['sequencer', id, 'colour'], '#828282').setIn(['sequencer', id, 'velocity'], 90);
	} else if (square.get('velocity') === 90) {
		return state.setIn(['sequencer', id, 'colour'], '#A9A9A9').setIn(['sequencer', id, 'velocity'], 60);
	} else if (square.get('velocity') === 60) {
		return state.setIn(['sequencer', id, 'colour'], '#DCDCDC').setIn(['sequencer', id, 'velocity'], 0);
	}
}

export default (state = initial, action) => {
	switch (action.type) {
		case UPDATE_MOUSEDOWN: return updateMouseDown(state, action);
		case UPDATE_DIAL: return updateDial(state, action);
		case UPDATE_FADER: return updateFader(state, action);
		case MOUSELEAVE: return mouseLeave(state, action);
		case ONCLICK_SQUARE: return onClickSquare(state, action);
		default: return state;
	}
};
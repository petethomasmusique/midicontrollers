import initial from "./initial";
import WebMidi from 'webmidi';
import { Map, List } from "immutable";
import { store } from '../index';
import { addListeners } from '../modules/events';

import { ONMOUSEDOWN_FADERDIAL } from "./actions";
import { ONMOUSELEAVE_FADERDIAL } from "./actions";
import { UPDATE_DIAL } from "./actions";
import { UPDATE_FADER } from "./actions";
import { ONMOUSEDOWN_SQUARE } from "./actions";
import { ONMOUSEUP_SQUARE } from "./actions";
import { SET_SINGLESQUARE } from "./actions";
import { SET_WHOLEGRID } from "./actions";
import { SET_ROW } from "./actions";
import { SET_COLUMN } from "./actions";
import { AVAILABLEMIDI } from "./actions";
import { UPDATE_MIDIDEVICE } from "./actions";
import { UPDATE_ERRORS } from "./actions";

/********************************************************************/
/*App ***************************************************************/
/********************************************************************/

const updateErrorsInState = (state, { messageString }) => {
	return state.set('errors', messageString);
}

/********************************************************************/
/*MIDI **************************************************************/
/********************************************************************/

const setAvailableMidi = (state, { inputs, outputs}) => {
	let availableMidiInputs = inputs.map(input => input._midiInput.name);
	let availableMidiOutputs = outputs.map(output => output._midiOutput.name);
	return state.set('availableMidiInputs', List(availableMidiInputs))
				.set('availableMidiOutputs', List(availableMidiOutputs));
}

const updateMidiDevice = (state, { inOut, device}) => {
	if (inOut === 'input') {
		// on input device selected, setup event listeners
		addListeners(device);
		return state.set('midiInDevice', device)
					.set('errors', '');
	} else if (inOut === 'output') {
		return state.set('midiOutDevice', device)
					.set('errors', '');
	} else {
		return state;
	}
}

/********************************************************************/
/*Dials and Faders **************************************************/
/********************************************************************/

const onMouseDownFaderDial = (state, { bool }) => {
	return state.set("mouseDown", bool);
}
const onMouseLeaveFaderDial = (state, { event, id }) => {
	if (state.get('mouseDown')) {
		return state.set('mouseDown', false);
	}
	return state;
} 

const updateDial = (state, { event, id }) => {
  	if (state.get('mouseDown')) {
		let knob = document.getElementById("knob-" + id);
		let knobInfo = knob.getBoundingClientRect();
  		let newValue = Math.floor(127 - (event.clientY - knobInfo.y) * (127/knobInfo.height));
  		let channel = state.getIn(['knobs', id, 'channel']);

  		let outputDevice = state.get('midiOutDevice');
		if (outputDevice !== '') {			
		    if (newValue < 3) {
		    	sendFaderDialMidi(channel, 0);
		    	return state.setIn(['knobs', id, 'value'], 0)
		    				.set('errors', '');
		    } else if (newValue > 124) {
		    	sendFaderDialMidi(channel, 127);
		    	return state.setIn(['knobs', id, 'value'], 127)
		    				.set('errors', '');
		    } else {
		    	sendFaderDialMidi(channel, newValue);
		    	return state.setIn(['knobs', id, 'value'], newValue)
		    				.set('errors', '');
		    }
		} else {
			return state.set('errors', 'No midi output selected.' );
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
		let channel = state.getIn(['faders', id, 'channel']);
		
  		let outputDevice = state.get('midiOutDevice');
		if (outputDevice !== '') {	
			if (midiValue < 0) {
				sendFaderDialMidi(channel, 0);
				return state.setIn(['faders', id, 'value'], faderHeight).setIn(['faders', id, 'midiValue'], 0)
							.set('errors', '');
		    } else if (midiValue > 127) {
		    	sendFaderDialMidi(channel, 127);
				return state.setIn(['faders', id, 'value'], 0).setIn(['faders', id, 'midiValue'], 127)
							.set('errors', '');
		    } else {
		    	sendFaderDialMidi(channel, midiValue);
				return state.setIn(['faders', id, 'value'], faderPosition).setIn(['faders', id, 'midiValue'], midiValue)
							.set('errors', '');
		    }
		} else {
			return state.set('errors', 'No midi output selected.' );
		}
	}
	return state;
}

const sendFaderDialMidi = (channel, val) => {
	let outputDevice = store.getState().get('midiOutDevice');
	WebMidi.getOutputByName(outputDevice) 
		   .sendControlChange( channel, val );
}

/********************************************************************/
/*Grid **************************************************************/
/********************************************************************/

// TODO: refactor mouse up and down as they are duplicates

const onMouseDownSquare = (state, { id }) => {
	let outputDevice = state.get('midiOutDevice');
	if (outputDevice !== '') {
		sendSysEx(id, 1);
	} else {
		return state.set('errors', 'No midi output selected.' );
	}
	return state;
}

const onMouseUpSquare = (state, { id }) => {
	let outputDevice = state.get('midiOutDevice');
	if (outputDevice !== '') {
		sendSysEx(id, 0);
	}
	return state;
}

// handles the sending of System Exclusive messages - essentially a way of sending arrays of data to other devices.
const sendSysEx = (id, val) => {
	let x = id % 16;
	let y = Math.floor(id / 16);
	let state = store.getState();
	let outputDevice = state.get('midiOutDevice');
	WebMidi.getOutputByName(outputDevice)
		   .sendSysex(0, [x, y, val]); // 1st argument grid number, 2nd array of data [x,y,z]
}

const setSingleSquare = (state, {data}) => {
	let x = data[2]; let y = data[3];
	let val = data[4];
	// convert xy to an index
	let index = getIndex(x, y, 16);
	let colour = getColour(val);
	// put into state
	return state.setIn(['sequencer', index, 'colour'], colour)
				.setIn(['sequencer', index, 'velocity'], val);
}

const setWholeGrid = (state, {data}) => {
	let val = data[2];
	let col = getColour(val);
	return state.set('sequencer', state.get('sequencer').map(() => Map({velocity: val, colour: col})));
}

const setRow = (state, {data}) => {
	if (data[2] >= 0 && data[2] < 8) { // check row is sensible
		let sequencer = setSequencer(data, 16); // get sequencer values in row mode
		return state.set('sequencer', sequencer);	
	} else {
		return state.set('errors', 'Error in Sysex message: no such row exists' );
	}
}

const setColumn = (state, {data}) => {
	if (data[2] >= 0 && data[2] < 16) { // check column is sensible
		let sequencer = setSequencer(data, 8); // get sequencer values in column mode
		return state.set('sequencer', sequencer);	
	} else {
		return state.set('errors', 'Error in Sysex message: no such column exists' );
	}
}

const setSequencer = (data, mode) => { // mode is 8 for col, 16 for row
	let valsArr = data.slice(3);
	let sequencer = store.getState().get('sequencer');
	if (valsArr.length === 1) { // if only one value supplied, apply to whole row
		for (let i = 0; i < 16; i++) {
			if (mode == 16) {
				return sequencer = sequencer.set(getIndex(i, data[2], 16), Map({velocity: valsArr[0], colour: getColour(valsArr[0])}));
			} else {
				return sequencer = sequencer.set(getIndex(data[2], i, 16), Map({velocity: valsArr[0], colour: getColour(valsArr[0])}));
			}
		}
	} else if (valsArr > 1) { 
		valsArr.map((val, i) => {
			if (i < mode) { // only accept 8 or 16 values, ignore the rest
				if (mode === 16) {
					return sequencer = sequencer.set(getIndex(i, data[2], 16), Map({velocity: val, colour: getColour(val)}) );
				} else {
					return sequencer = sequencer.set(getIndex(data[2], i, 16), Map({velocity: val, colour: getColour(val)}) );
				}
			}
		})

	}
	return sequencer;
}

const getIndex = (x, y, cols) => {
	let index = (y * cols) + x;
	return index;
}

const getColour = (val) => {
	if (val === 0) {
		return '#DCDCDC';
	} else if (val <= 60) {
		return '#A1A1A1';
	} else if (val <= 90) {
		return '#707070';
	} else {
		return '#1C1C1C';
	}
}

export default (state = initial, action) => {
	switch (action.type) {
		case ONMOUSEDOWN_FADERDIAL: return onMouseDownFaderDial(state, action);
		case ONMOUSELEAVE_FADERDIAL: return onMouseLeaveFaderDial(state, action);
		case UPDATE_DIAL: return updateDial(state, action);
		case UPDATE_FADER: return updateFader(state, action);
		case ONMOUSEDOWN_SQUARE: return onMouseDownSquare(state, action);
		case ONMOUSEUP_SQUARE: return onMouseUpSquare(state, action);
		case SET_SINGLESQUARE: return setSingleSquare(state, action);
		case SET_WHOLEGRID: return setWholeGrid(state, action);
		case SET_ROW: return setRow(state, action);
		case SET_COLUMN: return setColumn(state, action);
		case AVAILABLEMIDI: return setAvailableMidi(state, action);
		case UPDATE_MIDIDEVICE: return updateMidiDevice(state, action);
		case UPDATE_ERRORS: return updateErrorsInState(state, action);
		default: return state;
	}
};
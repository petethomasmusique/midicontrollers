import initial from "./initial";
import WebMidi from 'webmidi';
import { Map, List } from "immutable";

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

import { store } from '../index';

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
	if (inOut == 'input') {
		return state.set('midiInDevice', device);
	} else if (inOut == 'output') {
		return state.set('midiOutDevice', device);
	} else {
		console.log('error: 1st argument requires either input/output');
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
	    if (newValue < 3) {
	    	sendFaderDialMidi(channel, 0);
	    	return state.setIn(['knobs', id, 'value'], 0);
	    } else if (newValue > 124) {
	    	sendFaderDialMidi(channel, 127);
	    	return state.setIn(['knobs', id, 'value'], 127);
	    } else {
	    	sendFaderDialMidi(channel, newValue);
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
		let channel = state.getIn(['faders', id, 'channel']);
		if (midiValue < 0) {
			sendFaderDialMidi(channel, 0);
			return state.setIn(['faders', id, 'value'], faderHeight).setIn(['faders', id, 'midiValue'], 0);
	    } else if (midiValue > 127) {
	    	sendFaderDialMidi(channel, 127);
			return state.setIn(['faders', id, 'value'], 0).setIn(['faders', id, 'midiValue'], 127);
	    } else {
	    	sendFaderDialMidi(channel, midiValue);
			return state.setIn(['faders', id, 'value'], faderPosition).setIn(['faders', id, 'midiValue'], midiValue);
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

const onMouseDownSquare = (state, { id }) => {
	sendSysEx(id, 1);
	return state;
}

const onMouseUpSquare = (state, { id }) => {
	sendSysEx(id, 0);
	return state;
}

// handles the sending of System Exclusive messages - essentially a way of sending arrays of data to other devices.
const sendSysEx = (id, val) => {
	let x = id % 16;
	let y = Math.floor(id / 16);
	let outputDevice = store.getState().get('midiOutDevice');
	WebMidi.getOutputByName(outputDevice) // TODO: Make this variable depending on user choice
		   .sendSysex(1, [x, y, val]); // 1st argument grid number, 2nd array of data [x,y,z]
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
	let val = data[4];
	let col = getColour(val);
	return state.set('sequencer', state.get('sequencer').map(() => Map({velocity: val, colour: col})));
}

const setRow = (state, {data}) => {
	let row = data[1];
	if (row >= 0 && row < 7) { // check row is sensible
		let valsArr = data.slice(2);
		let sequencer = state.get('sequencer');
		valsArr.map((val, i) => {
			if (i < 16) { // only accept 16 values, ignore the rest
				let index = getIndex(i, row, 16);
				let colour = getColour(val);
				sequencer = sequencer.set(index, Map({velocity: val, colour: colour}) );
			}
		})
		return state.set('sequencer', sequencer);	
	} else {
		console.log("no such row exists.")
		return state;
	}
}

const setColumn = (state, {data}) => {
	let column = data[1];
	if (column >= 0 && column < 16) { // check column is sensible
		let valsArr = data.slice(2);
		let sequencer = state.get('sequencer');
		valsArr.map((val, i) => {
			if (i < 8) { // only accept 8 values, ignore the rest
				let index = getIndex(column, i, 16);
				let colour = getColour(val);
				sequencer = sequencer.set(index, Map({velocity: val, colour: colour}) );
			}
		})
		return state.set('sequencer', sequencer);	
	} else {
		console.log("no such column exists.")
		return state;
	}
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
		default: return state;
	}
};
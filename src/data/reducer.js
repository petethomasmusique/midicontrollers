import initial from "./initial";
import WebMidi from 'webmidi';

import { ONMOUSEDOWN_FADERDIAL } from "./actions";
import { ONMOUSELEAVE_FADERDIAL } from "./actions";
import { UPDATE_DIAL } from "./actions";
import { UPDATE_FADER } from "./actions";
import { ONMOUSEDOWN_SQUARE } from "./actions";
import { ONMOUSEUP_SQUARE } from "./actions";
import { ONSETSQUARE } from "./actions";

import { onSetSquare } from "./actions";

/********************************************************************/
/*WebMidi (TODO: MOVE) **********************************************/
/********************************************************************/

WebMidi.enable(function(err) {
	if (!err) {
		let input = WebMidi.getInputByName("from Max 1"); // TODO: Allow this to be changed when user chooses device
		input.addListener('sysex', "all", function (e) {
			receiveSysEx(e.data);
    	});
	} else {
		console.log('webmidi failed');
	}
}, true);

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
	WebMidi.getOutputByName("to Max 1") 
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
	WebMidi.getOutputByName("to Max 1") // TODO: Make this variable depending on user choice
		   .sendSysex(1, [x, y, val]); // 1st argument grid number, 2nd array of data [x,y,z]
}

// slightly complex solution here: for the state to be available we need to use our action creator and then dispatch it back to the reducer. So the question is , where does this kind of thing live?

const receiveSysEx = (data) => {
	// remove SysEx start/end data
	let dataArr = [].slice.call(data.slice(1, 6));
	switch (dataArr[0]) {
		case 0: // set single square
			console.log(dataArr);
			// onSetSquare(dataArr);
			break;
		case 1: // set whole grid
			console.log(dataArr);
			// setGrid();
			break;
		case 2: // set row
			console.log(dataArr);
			// setRow();
			break;
		case 3: // set column
			console.log(dataArr);
			// setColumn();
			break;
		default:
			console.log("Don't understand SysEx message in!")
	}
}

// // sets the state for the squares, including colour and velocity
// const setSquare = (state, id, colour, velocity) => {
// 	return state.setIn(['sequencer', id, 'colour'], colour)
// 				.setIn(['sequencer', id, 'velocity'], velocity);
// }

const setSquare = (state, {data}) => {
	console.log(data);
	return state;
}

export default (state = initial, action) => {
	switch (action.type) {
		case ONMOUSEDOWN_FADERDIAL: return onMouseDownFaderDial(state, action);
		case ONMOUSELEAVE_FADERDIAL: return onMouseLeaveFaderDial(state, action);
		case UPDATE_DIAL: return updateDial(state, action);
		case UPDATE_FADER: return updateFader(state, action);
		case ONMOUSEDOWN_SQUARE: return onMouseDownSquare(state, action);
		case ONMOUSEUP_SQUARE: return onMouseUpSquare(state, action);
		case ONSETSQUARE: return setSquare(state, action);
		default: return state;
	}
};
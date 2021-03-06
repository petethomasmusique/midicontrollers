import WebMidi from 'webmidi';
import {setSingleSquare} from '../data/actions';
import {setWholeGrid} from '../data/actions';
import {setRow} from '../data/actions';
import {setColumn} from '../data/actions';
import {availableMidi} from '../data/actions';
import {updateErrors} from '../data/actions';

import { store } from '../index';

export const enableMidi = (store) => {
	return WebMidi.enable(function(err) {
			if (!err) {
		  		// on successful enable, send a list of available devices to the state
		  		let inputs = WebMidi.inputs;
		  		let outputs = WebMidi.outputs;
		  		if (inputs == '' || outputs == '') {
		  			store.dispatch(updateErrors("Missing midi in/out device(s)"));
		  		}
		  		store.dispatch(availableMidi(inputs, outputs));
			} else {
				store.dispatch(updateErrors("Midi failed to enable"));
			}
		}, true);		
}

export const addListeners = (device) => {
	// remove all old listeners
	WebMidi.removeListener();
	let input = WebMidi.getInputByName(device); 
	// TODO: Should I remove any listeners?
	input.addListener('sysex', "all", function (e) {
		receiveSysEx(e.data, store);
	});
}

const receiveSysEx = (data, store) => {
	// convert to array
	let dataArr = [].slice.call(data);
	// remove SysEx start/end data
	dataArr.pop();
	dataArr.shift();
	// first value determines action
	switch (dataArr[0]) {
		case 0: // set single square
			store.dispatch(setSingleSquare(dataArr));
			break;
		case 1: // set whole grid	
			store.dispatch(setWholeGrid(dataArr));
			break;
		case 2: // set row
			store.dispatch(setRow(dataArr));
			break;
		case 3: // set column
			store.dispatch(setColumn(dataArr));
			break;
		default:
			store.dispatch(updateErrors("Don't understand incoming message! Please read the docs."));
	}
}
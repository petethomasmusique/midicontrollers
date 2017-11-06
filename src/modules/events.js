import WebMidi from 'webmidi';
import {setSingleSquare} from '../data/actions';
import {setWholeGrid} from '../data/actions';

export const enableMidi = (store) => {
	return WebMidi.enable(function(err) {
			if (!err) {
				let inputDevice = store.getState().get('midiInDevice');
				console.log(inputDevice);
				let input = WebMidi.getInputByName(inputDevice); // TODO: Allow this to be changed when user chooses device
				input.addListener('sysex', "all", function (e) {
					receiveSysEx(e.data, store);
		    	});
			} else {
				console.log('webmidi failed');
			}
		}, true);		
}

const receiveSysEx = (data, store) => {
	// remove SysEx start/end data
	let dataArr = [].slice.call(data.slice(1, 6));
	console.log(dataArr);
	switch (dataArr[0]) {
		case 0: // set single square
			console.log(dataArr);
			store.dispatch(setSingleSquare(dataArr));
			break;
		case 1: // set whole grid
			console.log(dataArr);
			store.dispatch(setWholeGrid(dataArr));
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



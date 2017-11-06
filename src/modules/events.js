import WebMidi from 'webmidi';
import {onSetSquare} from '../data/actions';

export const enableMidiAndListenForEvents =	(store) => {
	return WebMidi.enable(function(err) {
			if (!err) {
				let input = WebMidi.getInputByName("from Max 1"); // TODO: Allow this to be changed when user chooses device
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
	switch (dataArr[0]) {
		case 0: // set single square
			console.log('set square');
			store.dispatch(onSetSquare(data));
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



import { Map, List, Range } from "immutable";
// TODO - set a midiOut port - what to do if no port is available (currently if no port - MAX is not open for example - app will crash)

export default Map({
	mouseDown: false,
	knobs: Range(0, 3).map((i) => Map({ value: 0, label: 'send', channel: i })).toList(),
	faders: Range(0, 7).map((i) => Map({ value: 0, midiValue: 127, label: 'level', channel: i })).toList(),
	sequencer: Range(0, 128).map(() => Map({velocity: 0, colour: '#DCDCDC', pitch: 60,  })).toList(),
});
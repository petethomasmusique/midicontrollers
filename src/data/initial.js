import { Map, Range } from "immutable";

export default Map({
	midiInDevice: 'from Max 1',
	midiOutDevice: 'to Max 1',
	availableMidiInputs: null,
	availableMidiOutputs: null,
	mouseDown: false,
	knobs: Range(9, 19).map((i) => Map({ value: 0, label: 'send', channel: i })).toList(),
	faders: Range(0, 9).map((i) => Map({ value: 0, midiValue: 127, label: 'level', channel: i })).toList(),
	sequencer: Range(0, 128).map(() => Map({velocity: 0, colour: '#DCDCDC'})).toList(),
});
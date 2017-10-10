import { Map, List } from "immutable";
// TODO - set a midiOut port - what to do if no port is available (currently if no port - MAX is not open for example - app will crash)

export default Map({
	mouseDown: false,
	knobs: List([
		Map({ value: 0, label: 'send', channel: 0}),
		Map({ value: 0, label: 'send', channel: 1}),
		Map({ value: 0, label: 'send', channel: 2}),
		Map({ value: 0, label: 'send', channel: 3}),
		Map({ value: 0, label: 'send', channel: 4}),
	]),
	faders: List([
		Map({ value: 0, midiValue: 127, label: 'level', channel: 0}),
		Map({ value: 0, midiValue: 127, label: 'level', channel: 1}),
		Map({ value: 0, midiValue: 127, label: 'level', channel: 2}),
		Map({ value: 0, midiValue: 127, label: 'level', channel: 3}),
		Map({ value: 0, midiValue: 127, label: 'level', channel: 4}),
	]),
});
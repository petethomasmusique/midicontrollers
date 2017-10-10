import { Map, List } from "immutable";

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
		Map({ value: 0, label: 'level', channel: 0}),
		Map({ value: 100, label: 'level', channel: 1}),
		Map({ value: 50, label: 'level', channel: 2}),
		Map({ value: 20, label: 'level', channel: 3}),
		Map({ value: 0, label: 'level', channel: 4}),
	]),
});
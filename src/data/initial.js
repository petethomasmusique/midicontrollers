import { Map, List } from "immutable";

export default Map({
	mouseDown: false,
	knobs: List([
		Map({ value: 0, label: ""}),
		Map({ value: 0, label: ""}),
		Map({ value: 0, label: ""}),
		Map({ value: 0, label: ""}),
		Map({ value: 0, label: ""}),
	]),
});
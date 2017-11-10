import { connect } from "react-redux";
import Devices from "../components/Devices";
import { updateMidiDevice } from "../data/actions";

const mapStateToProps = state => ({
	availableMidiInputs: state.get('availableMidiInputs'),
	availableMidiOutputs: state.get('availableMidiOutputs'),
});

const mapDispatchToProps = dispatch => ({
	updateMidiDevice: (inOut, device) => dispatch(updateMidiDevice(inOut, device)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Devices);
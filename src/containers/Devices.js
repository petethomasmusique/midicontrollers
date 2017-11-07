import { connect } from "react-redux";
import Devices from "../components/Devices";

const mapStateToProps = state => ({
	availableMidiDevices: state.get('availableMidiDevices'),
});

const mapDispatchToProps = dispatch => ({

}) 
export default connect(mapStateToProps, mapDispatchToProps)(Devices);
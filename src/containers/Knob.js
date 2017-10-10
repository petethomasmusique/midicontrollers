import { connect } from "react-redux";
import Knob from "../components/Knob";
import { updateMouseDown } from "../data/actions";
import { updateDial } from "../data/actions";
import { updateDialMouseLeave } from "../data/actions";

const mapStateToProps = state => ({
    knobs: state.get("knobs"),
});

const mapDispatchToProps = dispatch => ({
    mouseDown: (bool) => dispatch(updateMouseDown(bool)),
    updateDial: (event, id) => dispatch(updateDial(event, id)),
    updateDialmouseLeave: (event, id) => dispatch(updateDialMouseLeave(event, id)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Knob);
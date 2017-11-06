import { connect } from "react-redux";
import Knob from "../components/Knob";
import { onMouseDownFaderDial } from "../data/actions";
import { updateDial } from "../data/actions";
import { onMouseLeaveFaderDial } from "../data/actions";

const mapStateToProps = state => ({
    knobs: state.get("knobs"),
});

const mapDispatchToProps = dispatch => ({
    mouseDown: (bool) => dispatch(onMouseDownFaderDial(bool)),
    mouseLeave: (event, id) => dispatch(onMouseLeaveFaderDial(event, id)),
    updateDial: (event, id) => dispatch(updateDial(event, id)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Knob);
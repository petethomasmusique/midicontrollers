import { connect } from "react-redux";
import Fader from "../components/Fader";

import { onMouseDownFaderDial } from "../data/actions";
import { onMouseLeaveFaderDial } from "../data/actions";
import { updateFader } from "../data/actions";

const mapStateToProps = state => ({
    faders: state.get("faders"),
});

const mapDispatchToProps = dispatch => ({
    mouseDown: (bool) => dispatch(onMouseDownFaderDial(bool)),
    mouseLeave: (event, id) => dispatch(onMouseLeaveFaderDial(event, id)),
    updateFader: (event, id) => dispatch(updateFader(event, id)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Fader);
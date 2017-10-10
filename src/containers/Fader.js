import { connect } from "react-redux";
import Fader from "../components/Fader";
import { updateMouseDown } from "../data/actions";
import { updateFader } from "../data/actions";
import { updateFaderMouseLeave } from "../data/actions";

const mapStateToProps = state => ({
    faders: state.get("faders"),
});

const mapDispatchToProps = dispatch => ({
    mouseDown: (bool) => dispatch(updateMouseDown(bool)),
    updateFader: (event, id) => dispatch(updateFader(event, id)),
    updateFaderMouseLeave: (event, id) => dispatch(updateFaderMouseLeave(event, id)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Fader);
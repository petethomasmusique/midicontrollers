import { connect } from "react-redux";
import Fader from "../components/Fader";
import { updateMouseDown } from "../data/actions";
import { mouseLeave } from "../data/actions";
import { updateFader } from "../data/actions";

const mapStateToProps = state => ({
    faders: state.get("faders"),
});

const mapDispatchToProps = dispatch => ({
    mouseDown: (bool) => dispatch(updateMouseDown(bool)),
    mouseLeave: (event, id) => dispatch(mouseLeave(event, id)),
    updateFader: (event, id) => dispatch(updateFader(event, id)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Fader);
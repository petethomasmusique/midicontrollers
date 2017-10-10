import { connect } from "react-redux";
import Knobs from "../components/Knobs";
import { updateMouseDown } from "../data/actions";
import { updateMouseMove } from "../data/actions";
import { updateMouseLeave } from "../data/actions";

const mapStateToProps = state => ({
    knobs: state.get("knobs"),
});

const mapDispatchToProps = dispatch => ({
    mouseDown: (bool) => dispatch(updateMouseDown(bool)),
    mouseMove: (event, id) => dispatch(updateMouseMove(event, id)),
    mouseLeave: (event, id) => dispatch(updateMouseLeave(event, id)),
}) 
export default connect(mapStateToProps, mapDispatchToProps)(Knobs);
import { connect } from "react-redux";
import Squares from "../components/Squares";
import { onMouseUpSquare } from "../data/actions";
import { onMouseDownSquare } from "../data/actions";

const mapStateToProps = state => ({
    sequencer: state.get("sequencer"),
});

const mapDispatchToProps = dispatch => ({
    onMouseDownSquare: (id) => dispatch(onMouseDownSquare(id)),
    onMouseUpSquare: (id) => dispatch(onMouseUpSquare(id)),
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Squares);
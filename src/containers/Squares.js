import { connect } from "react-redux";
import Squares from "../components/Squares";
import { onClickSquare } from "../data/actions";

const mapStateToProps = state => ({
    sequencer: state.get("sequencer"),
});

const mapDispatchToProps = dispatch => ({
    onClickSquare: (id) => dispatch(onClickSquare(id)),
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Squares);
import { connect } from "react-redux";
import Errors from "../components/Errors";
import { updateErrors } from "../data/actions";

const mapDispatchToProps = dispatch => ({
	onClick: () => dispatch(updateErrors("")),
})

const mapStateToProps = state => ({
	errors: state.get('errors'), 
});

export default connect(mapStateToProps, mapDispatchToProps)(Errors);
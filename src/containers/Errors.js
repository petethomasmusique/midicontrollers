import { connect } from "react-redux";
import Errors from "../components/Errors";


const mapStateToProps = state => ({
	errors: state.get('errors'), 
});

export default connect(mapStateToProps)(Errors);
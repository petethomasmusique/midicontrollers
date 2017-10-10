import { connect } from "react-redux";
import Knobs from "../components/Knobs";

const mapStateToProps = state => ({
    knobs: state.get("knobs"),
});

export default connect(mapStateToProps)(Knobs);
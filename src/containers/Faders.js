import { connect } from "react-redux";
import Faders from "../components/Faders";

const mapStateToProps = state => ({
    faders: state.get("faders"),
});

export default connect(mapStateToProps)(Faders);
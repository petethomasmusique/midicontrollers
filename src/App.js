import React, { Component } from 'react';
import Knobs from "./containers/Knobs";
import Faders from "./containers/Faders";
import Squares from "./containers/Squares";
import Devices from "./containers/Devices";
import Errors from "./containers/Errors";

class App extends Component {
  	render() {
    	return (
      		<div className="App">
        		<Squares />
      			<Devices />
            <Errors />
      			<div className="controls">
	    			  <Faders />
	      			<Knobs />
      			</div>
      		</div>
    	);
  	}
}

export default App;

import React, { Component } from 'react';
import Knobs from "./containers/Knobs";
import Faders from "./containers/Faders";
import Squares from "./containers/Squares";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Knobs />
      	<Faders />
        <Squares />
      </div>
    );
  }
}

export default App;

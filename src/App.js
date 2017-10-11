import React, { Component } from 'react';
import Knobs from "./containers/Knobs";
import Faders from "./containers/Faders";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Knobs />
      	<Faders />
      </div>
    );
  }
}

export default App;

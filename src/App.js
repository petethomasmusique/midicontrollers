import React, { Component } from 'react';
import MidiController from "./containers/Knobs_container";

class App extends Component {
  render() {
    return (
      <div className="App">
        <MidiController />
      </div>
    );
  }
}

export default App;

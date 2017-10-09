import React, { Component } from 'react';
import MidiController from "./controls/Knobs";

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

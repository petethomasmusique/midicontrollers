import React, { Component } from 'react';
import Knobs from "./containers/Knobs";
import Faders from "./containers/Faders";
import Square from "./components/Square";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Knobs />
      	<Faders />
      	<Square />
      	<Square />
      	<Square />
      	<Square />
      </div>
    );
  }
}

export default App;

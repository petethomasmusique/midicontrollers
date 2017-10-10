import React, { Component } from 'react';
import Knobs from "./containers/Knobs";
import Fader from "./containers/Fader";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Knobs />
      	<Fader key={ 0 } id={ 0 }/>
      	<Fader key={ 1 } id={ 1 }/>
      	<Fader key={ 2 } id={ 2 }/>
      </div>
    );
  }
}

export default App;

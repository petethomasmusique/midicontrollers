// immutable?
// presentation so that it can go live? - choose port/channel/number of dials/labels...
// get list of available ports and populate a dropdown?
// add midi ctrl channels to state
// do more scaling of the data so that the knob could change size and it would all still function/less brittle - should be able to use this knob again and again in other apps.


import React, { Component } from 'react';
import Knob from "./Knob";
import WebMidi from '../../node_modules/webmidi';

class MidiController extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mouseDown: false,
			knobs: [0,1,2,3,4,5,6,7,8].map((item) => item = {value: 0, label: ""}),
		}
	}

	sendMidi(id, val) {
		WebMidi.enable(function(err) {
			if (!err) {
				this.midiOut = WebMidi.getOutputByName("to Max 1"); 
				this.midiOut.sendControlChange( id, val );
				WebMidi.disable();
			}
		});
	}

	mouseDown(e) {
		this.setState({ mouseDown: true });
	}

	mouseMove(e, id) {
		let knobs = this.state.knobs;
	    if (!this.state.mouseDown) {
	       return;
	    } else {
    		let knob = document.getElementById("knob-" + id);
    		let knobInfo = knob.getBoundingClientRect();
      	let newValue = 127 - (e.clientY - knobInfo.y); // scale y co-ordinate depending on where the element is
        if (newValue < 0) {
        	knobs[id].value = 0;
        	this.sendMidi(id, 0);
        } else if (newValue > 127) {
        	knobs[id].value = 127;
        	this.sendMidi(id, 127);
        } else {
      		knobs[id].value = newValue;
        	this.sendMidi(id, newValue);
        }
        this.setState({knobs: knobs});
	    }
	}

	mouseUp(e) {
    	this.setState({mouseDown: false});
	}

	mouseLeave(e, id) {
		if (this.state.mouseDown) {
			let knobs = this.state.knobs;
	    	this.setState({ mouseDown: false })
			if (knobs[id].value > 120) {
				knobs[id].value = 127;
				this.setState({ knobs: knobs });
			} else if (knobs[id].value < 5) {
				knobs[id].value = 0;
				this.setState({ knobs: knobs });
			}
	  }
	}

	render() {
		return (
			<div>
				{ this.state.knobs.map( ({value}, i) => (
						<Knob
							key={ i }
							id={ i }
							value={ value * 2.52 } // converts midi 0-127 to deg
							onMouseDown={ (e) => this.mouseDown(e) }
							onMouseMove={ (e) => this.mouseMove(e, i) }
	       			onMouseUp={ (e) => this.mouseUp(e) }
	       			onMouseLeave={ (e) => this.mouseLeave(e, i) }
						/>
				))}		
			</div>
		)
	}
}

export default MidiController;
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import state from "./data/reducer"; 
import App from './App';
import { enableMidi } from './modules/events';

// create a store using our reducer
export const store = createStore(state);
enableMidi(store);

ReactDOM.render(
    // wrap the App component with the store Provider
    <Provider store={ store }>
        <App />
    </Provider>,

    document.getElementById("root")
);

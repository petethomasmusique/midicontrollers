import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from "redux";
import { Provider } from "react-redux";
import state from "./data/reducer";
import App from './App';

// create a store using our reducer
const store = createStore(state);

ReactDOM.render(
    // wrap the App component with the store Provider
    <Provider store={ store }>
        <App />
    </Provider>,

    document.getElementById("root")
);

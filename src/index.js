import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducer";
import App from "./App";

import "./index.css";

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    promiseMiddleware,
    thunkMiddleware
  )));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

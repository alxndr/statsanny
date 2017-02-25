import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import thunkMiddleware from "redux-thunk";

import reducer from "./reducer";
import App from "./App";

import "./index.css";

const store = createStore(
  reducer,
  applyMiddleware(
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    promiseMiddleware,
    thunkMiddleware,
  ));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

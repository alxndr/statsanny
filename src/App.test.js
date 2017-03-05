import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App"; // unconnected version of component

it.skip("renders without crashing", () => { // eslint-disable-line no-undef
  // dies because Jest doesn't know Object::values()...
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

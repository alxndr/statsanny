import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App"; // unconnected version of component

it("renders without crashing", () => { // eslint-disable-line no-undef
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

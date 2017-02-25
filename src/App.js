import React, { Component } from "react";

import ShowList from "./ShowList";

import "./App.css";

const initialState = {
  shows: [],
};

function loadState() {
  try {
    return global.localStorage
      && global.localStorage.state
      && JSON.parse(global.localStorage.state)
      || initialState;
  } catch (_error) {
    return initialState;
  }
}

function showFor(date) {
  return {
    date,
    players: [],
    picks: {}
  };
}

function saveState(state) {
  if (global.localStorage) {
    global.localStorage.state = JSON.stringify(state);
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = loadState();
    this.addShow = this._addShow.bind(this);
    this.saveState = this._saveState.bind(this);
  }

  componentDidUpdate() {
    saveState(this.state);
  }

  _addShow() {
    const date = window.prompt("Date? YYYY-MM-DD").trim(); // TODO calendar prompt
    // TODO check that it's in the future or it exists on .net
    this.setState({shows: [showFor(date), ...this.state.shows]});
  }

  _saveState() {
    saveState(this.state);
  }

  render() {
    return <div className="app">
      <button className="addShow" onClick={this.addShow}>add a show</button>
      <ShowList shows={this.state.shows} onUpdated={this.saveState} />
    </div>;
  }
}

export default App;

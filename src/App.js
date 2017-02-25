import React, { Component } from "react";

import Show from "./Show";

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

function showToElement(show) {
  return <li key={show.date}>
    <Show {...show} />
  </li>;
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = loadState();
    this.addShow = this._addShow.bind(this);
  }

  _addShow() {
    const date = window.prompt("Date? YYYY-MM-DD").trim();
    this.setState({shows: [showFor(date), ...this.state.shows]});
  }

  render() {
    return <div className="app">
      <button className="addShow" onClick={this.addShow}>add a show</button>
      <ul className="shows">
        {this.state.shows.map(showToElement)}
      </ul>
    </div>;
  }
}

export default App;

import React, { Component } from "react";

import Show from "./Show";

import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
    this.addShow = this._addShow.bind(this);
  }

  _addShow() {
    const date = window.prompt("Date? YYYY-MM-DD").trim();
    this.props.shows.push({
      date,
      players: [],
      picks: {}
    });
    this.forceUpdate();
  }

  render() {
    console.log("app rendering...", this.props);
    return <div className="app">
      <button className="addShow" onClick={this.addShow}>add a show</button>
      <ul className="shows">
      {this.props.shows.map((show) => {
        return <li key={show.date}>
          <Show {...show} />
        </li>;
      })}
      </ul>
    </div>;
  }
}

App.defaultProps = {
  shows: []
};

export default App;

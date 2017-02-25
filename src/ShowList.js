import React, { Component } from "react";

import Show from "./Show";

import "./ShowList.css";

class ShowList extends Component {

  constructor(props) {
    super(props);
    this.convertShowToElement = this._convertShowToElement.bind(this);
  }

  _convertShowToElement(show) {
    return <li key={show.date}>
      <Show {...show} onUpdated={this.props.onUpdated} />
    </li>;
  }

  render() {
    return <ul className="shows">
      {this.props.shows.map(this.convertShowToElement)}
    </ul>
  }
}

export default ShowList;

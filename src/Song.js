import React, { Component } from "react";

import Points from "./Points";

import "./Song.css";

class Song extends Component {
  render() {
    return <div className="song">
      {this.props.title}
      <Points points={this.props.points} />
      <button className="deleteSong" onClick={this.props.removeSong}>❌</button>
    </div>;
  }
}

export default Song;

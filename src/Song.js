import React, { Component } from "react";

import "./Song.css";

class Song extends Component {
  render() {
    const points = this.props.points ? <span className="points">{this.props.points}</span> : false;
    return <div className="song">
      {this.props.title}
      {points}
      <button className="deleteSong" onClick={this.props.removeSong}>❌</button>
    </div>;
  }
}

export default Song;

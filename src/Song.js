import React, { Component } from "react";

import "./Song.css";

class Song extends Component {
  render() {
    return <div className="song">
      {this.props.title}
      <button className="deleteSong" onClick={this.props.removeSong}>x</button>
    </div>;
  }
}

export default Song;

import React, { Component } from "react";

class Points extends Component {
  render() {
    if (!this.props.points) {
      return false;
    }
    return <span className="points">
      {this.props.points} point{this.props.points === 1 ? "" : "s"}
    </span>;
  }
}

export default Points;

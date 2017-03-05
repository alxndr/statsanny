import React, { Component } from "react";

import "./Points.css";

class Points extends Component {
  render() {
    if (!this.props.points) {
      return false;
    }
    return <span className="points">
      {this.props.points}
    </span>;
  }
}

export default Points;

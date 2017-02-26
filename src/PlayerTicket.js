import React, { Component } from "react";
import { slugify } from "./utils";

import Points from "./Points";

import "./PlayerTicket.css";

class PlayerTicket extends Component {
  render() {
    const key = [this.props.date, this.props.name].join("-");
    return <div className="player-ticket">
      <button className="close" onClick={this.props.onRemove}>x</button>
      <p className="player">{this.props.name}'s picks</p>
      <Points points={this.props.points} />
      <ul className="picks">
        {this.props.songs.map((pick) => {
          return <li key={`${this.props.slug}-${slugify(pick.title)}`}>{pick.title}</li>;
        })}
      </ul>
      <button className="addPick" onClick={this.props.chooseSong.bind(this, this.props.name, this.props.date)}>+</button>
    </div>
  }
}

export default PlayerTicket;

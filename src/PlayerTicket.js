import React, { Component } from "react";
import { slugify } from "./utils";

import Points from "./Points";
import Song from "./Song";

import "./PlayerTicket.css";

class PlayerTicket extends Component {
  render() {
    const key = [this.props.date, this.props.name].join("-");
    return <div className="player-ticket">
      <p className="player">{this.props.name}'s picks</p>
      <Points points={this.props.points} />
      <ul className="picks">
        {this.props.songs.map((song) => {
          const songInfo = {
            name: this.props.name,
            date: this.props.date,
            song,
          };
          return <li key={`${key}-${slugify(song.title)}`}>
            <Song
              {...song}
              removeSong={this.props.removeSong.bind(null, songInfo)}
            />
          </li>;
        })}
      </ul>
      <button className="addPick" onClick={this.props.chooseSong.bind(this, this.props.name, this.props.date)}>+</button>
      <button className="deleteTicket" onClick={this.props.deleteTicket}>❌</button>
    </div>;
  }
}

export default PlayerTicket;

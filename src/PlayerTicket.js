import React, { Component } from "react";
import { slugify } from "./utils";

import Points from "./Points";

// import "./PlayerTicket.css"; // TODO

class PlayerTicket extends Component {
  render() {
    return <div className="player-ticket">
      <button className="close" onClick={this.props.onRemove}>x</button>
      <p className="player">
        {this.props.name}'s picks...
        <Points points={this.props.points} />
      </p>
      <ul className="picks">
        {this.props.picks.map((songSlug) => {
          const pick = this.props.picks[songSlug];
          return <li key={`${this.props.slug}-${slugify(pick.title)}`}>{pick.title}</li>;
        })}
        {/*<li><button className="addPick" onClick={this.chooseSong.bind(this, player)}>+</button></li>*/}
      </ul>
    </div>
  }
}

export default PlayerTicket;

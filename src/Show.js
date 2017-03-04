import React, { Component } from "react";
import moment from "moment";

import PlayerTicket from "./PlayerTicket";

import "./Show.css";

// TODO have this look up the date if it's in the past

class Show extends Component {

  /* _runTheNumbers() {
   *   data.tracks.forEach((track) => {
   *     const songSlug = slugify(track.title.toLowerCase());
   *     const winningTicket = this.props.tickets.find((ticket) => {
   *       return ticket.songs.find((song) => slugify(song.title.toLowerCase()) === songSlug);
   *     });
   *     if (winningTicket) {
   *       global.console.info("found it!", winningTicket.name);
   *     }
   *   });
   * }
   */

  render() {
    return <div className="show">
      <button onClick={this.props.removeShow} className="deleteShow">❌</button>
      <p className="date">{moment(this.props.date).format("MMM D, YYYY")}</p> {/* TODO print this nicer; include venue if possible */}
      <button className="calculate" onClick={this.props.scoreShow}>💱</button>
      <button className="addPerson" onClick={() => this.props.addPerson(this.props.date)}>➕</button>
      <ul className="tickets">
        {this.props.tickets.map((ticket) =>
          <li key={ticket.id}>
            <PlayerTicket
              {...ticket}
              chooseSong={this.props.chooseSong}
              deleteTicket={this.props.removeTicket.bind(null, ticket.id)}
              removeSong={this.props.removeSong}
            />
          </li>
        )}
      </ul>
    </div>;
  }
}

export default Show;

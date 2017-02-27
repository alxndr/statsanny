import React, { Component } from "react";

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
      <button onClick={this.props.removeShow} className="deleteShow">x</button>
      <p className="date">{this.props.date}</p>
      <button onClick={this.props.scoreShow}>calculate</button>
      <button className="addPerson" onClick={() => this.props.addPerson(this.props.date)}>add person</button>
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

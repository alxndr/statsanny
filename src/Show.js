import React, { Component } from "react";
import { slugify } from "./utils";

import PlayerTicket from "./PlayerTicket";

import "./Show.css";

function extractJson(response) {
  return response.json();
}

class Show extends Component {

  constructor(props) {
    super(props);
    this.runTheNumbers = this._runTheNumbers.bind(this);
  }

  _runTheNumbers() { // TODO move this to a real action
    if (!this.props.tickets || !this.props.tickets.length) {
      global.console.error("ruh roh");
      return false;
    }
    this.props.tickets.map((ticket) => ticket.points = 0); // reset scores
    return fetch(`//phish.in/api/v1/shows/${this.props.date}`)
      .then(extractJson)
      .then(({data}) => {
        if (!data) {
          return false;
        }
        data.tracks.forEach((track) => {
          const songSlug = slugify(track.title.toLowerCase());
          const winningTicket = this.props.tickets.find((ticket) => {
            return ticket.songs.find((song) => slugify(song.title.toLowerCase()) === songSlug);
          });
          if (winningTicket) {
            global.console.info("found it!", winningTicket.name);
          }
        });
        return data;
      })
    ;
  }

  addPick(player, songName) {
    const songSlug = slugify(songName.toLowerCase());
    this.props.picks[songSlug] = {
      title: songName,
      who: player.name
    };
    player.picks.push(songSlug);
  }

  render() {
    return <div className="show">
      <button onClick={this.props.removeShow} className="deleteShow">x</button>
      <p className="date">{this.props.date}</p>
      <button onClick={this.runTheNumbers}>calculate</button>
      <button className="addPerson" onClick={() => this.props.addPerson(this.props.date)}>add person</button>
      <ul className="tickets">
        {this.props.tickets.map((ticket) =>
          <li key={ticket.id}>
            <PlayerTicket
              {...ticket}
              chooseSong={this.props.chooseSong}
              onRemove={this.props.removeTicket.bind(null, ticket.id)}
            />
          </li>
        )}
      </ul>
    </div>;
  }
}

export default Show;

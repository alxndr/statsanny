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
      console.error("ruh roh");
      return false;
    }
    this.props.tickets.map((ticket) => ticket.points = 0); // reset scores
    return fetch(`http://phish.in/api/v1/shows/${this.props.date}`)
      .then(extractJson)
      .then(({data}) => {
        if (!data) {
          return false;
        }
        data.tracks.forEach((track) => {
          const songSlug = slugify(track.title.toLowerCase());
          console.log("looking for", songSlug);
          const winningTicket = this.props.tickets.find((ticket) => {
            return ticket.songs.find((song) => slugify(song.title.toLowerCase()) === songSlug);
          });
          if (winningTicket) {
            console.log("found it!", winningTicket.name);
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

  removePlayer(player) {
    player.picks.forEach((pickSlug) => {
      delete this.props.picks[pickSlug];
    });
    this.props.players.splice(this.props.players.indexOf(player), 1);
    this.forceUpdate(); // TODO get rid of this
  }

  render() {
    return <div className="show">
      {/*<button onClick={this.props.removeShow} className="close">x</button>*/}
      <p className="date">{this.props.date}</p>
      <button onClick={this.runTheNumbers}>calculate</button>
      <button className="addPerson" onClick={() => this.props.addPerson(this.props.date)}>add person</button>
      <ul className="tickets">
        {this.props.tickets.map((ticket) => {
          // TODO extract this
          return <li key={ticket.id}>
            <PlayerTicket
              {...ticket}
              chooseSong={this.props.chooseSong}
              onRemove={this.removePlayer.bind(this)}
            />
          </li>;
        })}
      </ul>
    </div>;
  }
}

export default Show;

import React, { Component } from "react";
import { slugify } from "./utils";

import PlayerTicket from "./PlayerTicket";

import { findAlias } from "./song-helper";

import "./Show.css";

function extractJson(response) {
  return response.json();
}

// function nameToPlayer(name) {
//   name = name.trim();
//   return {
//     name,
//     picks: [],
//     points: 0,
//     slug: slugify(name),
//   };
// }

class Show extends Component {

  constructor(props) {
    super(props);
    this.runTheNumbers = this._runTheNumbers.bind(this);
  }

  _runTheNumbers() {
    if (!this.props.picks || !Object.keys(this.props.picks)) {
      console.error("ruh roh");
      return false;
    }
    this.props.players.map((player) => player.points = 0); // reset scores
    return fetch(`http://phish.in/api/v1/shows/${this.props.date}`)
      .then(extractJson)
      .then(({data}) => {
        if (!data) {
          return false;
        }
        data.tracks.forEach((track) => {
          const songSlug = slugify(track.title.toLowerCase());
          const thePick = this.props.picks[songSlug];
          if (thePick) {
            const player = this.props.players.find((player) => player.name === thePick.who);
            player.points += 1;
            console.log(thePick.who, "picked", track.title, "now has", player.points, "points");
          }
        });
        this.forceUpdate();
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

  chooseSong(player) {
    let pick = window.prompt("What's your pick?").trim();
    if (!pick.length) {
      return;
    }
    const aliasedTo = findAlias(pick);
    if (aliasedTo) {
      pick = window.prompt("Did you mean...", aliasedTo);
    }
    // TODO check for already picked...
    this.addPick(player, pick);
    this.forceUpdate();
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

import React, { Component } from "react";
import slugify from "slugify";
// import uniqid from "uniqid";

import Points from "./Points";

import "./Show.css";

function extractJson(response) {
  return response.json();
}

function nameToPlayer(name) {
  name = name.trim();
  return {
    name,
    picks: [],
    points: 0,
    slug: slugify(name),
  };
}

class Show extends Component {

  _addPlayer() {
    const name = window.prompt("name?").trim();
    if (!name.length) {
      return;
    }
    this.props.players.push(nameToPlayer(name));
    this.forceUpdate();
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
        // console.log("got data", data);
        // console.log("picks...", this.props.picks);
        data.tracks.map((track) => {
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

  constructor(props) {
    super(props);
    this.addPlayer = this._addPlayer.bind(this);
    this.runTheNumbers = this._runTheNumbers.bind(this);
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
    const pick = window.prompt("What's your pick?").trim();
    if (!pick.length) {
      return;
    }
    // TODO check for already picked...
    this.addPick(player, pick);
    this.forceUpdate();
  }

  removePlayer(player) {
    console.log("removing", player);
    player.picks.map((pickSlug) => {
      delete this.props.picks[pickSlug];
    });
    this.props.players.splice(this.props.players.indexOf(player), 1);
    console.log("now we have props...", this.props);
    this.forceUpdate();
  }

  render() {
    // console.log("show rendering", this.props);
    return <div className="show">
      <p className="date">
        <input type="text" value={this.props.date} readOnly />
        <button onClick={this.runTheNumbers}>run the numbers</button>
      </p>
      <button className="addPerson" onClick={this.addPlayer}>add person</button>
      <ul className="players">
        {this.props.players.map((player) => {
          return <li key={player.slug}>
            <button className="close" onClick={this.removePlayer.bind(this, player)}>x</button>
            <p className="player">{player.name}'s picks... <Points points={player.points} /></p>
            <ul className="picks">
              {player.picks.map((songSlug) => {
                const pick = this.props.picks[songSlug];
                return <li key={`${player.slug}-${slugify(pick.title)}`}>{pick.title}</li>;
              })}
              <li><button className="addPick" onClick={this.chooseSong.bind(this, player)}>+</button></li>
            </ul>
          </li>;
        })}
      </ul>
    </div>;
  }
}

export default Show;

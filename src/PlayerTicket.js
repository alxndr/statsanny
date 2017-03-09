import React from "react";
import { slugify } from "./utils";

import Points from "./Points";
import Song from "./Song";

import "./PlayerTicket.css";

function PlayerTicket(props) {
  const key = [props.date, props.name].join("-");
  return <div className="player-ticket">
    <p className="player">{props.name}'s picks</p>
    <ul className="picks">
      {props.songs.map((song) => {
        const songInfo = {
          name: props.name,
          date: props.date,
          song,
        };
        return <li key={`${key}-${slugify(song.title)}`}>
          <Song {...song} removeSong={props.removeSong.bind(null, songInfo)} />
        </li>;
      })}
    </ul>
    <Points points={props.score} />
    <button className="addPick" onClick={props.chooseSong.bind(null, props.name, props.date)}>+</button>
    <button className="deleteTicket" onClick={props.deleteTicket}>❌</button>
  </div>;
}

export default PlayerTicket;

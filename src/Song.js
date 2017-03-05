import React from "react";

import Points from "./Points";

import "./Song.css";

function Song(props) {
  return <div className="song">
    <span className="title">{props.title}</span>
    <Points points={props.points} />
    <button className="deleteSong" onClick={props.removeSong}>❌</button>
  </div>;
}

export default Song;

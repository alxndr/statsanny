import React from "react";
import moment from "moment";

import PlayerTicket from "./PlayerTicket";

import "./Show.css";

function where({location, venue}) {
  if (location && venue) {
    return <p className="where">@ {venue}<br/>{location}</p>
  }
  if (location) {
    return <p className="where">@ {location}</p>
  }
  if (venue) {
    return <p className="where">@ {venue}</p>
  }
  return false;
}

function Show(props) {
  const dateFormatted = moment(props.date).format("MMM D, YYYY");
  const dateContents = props.url
    ? <a href={props.url} target="_blank" rel="noopener noreferrer">{dateFormatted}</a>
    : dateFormatted;
  return <div className="show">
    <button onClick={props.removeShow} className="deleteShow">❌</button>
    <button className="addPerson" onClick={() => props.addPerson(props.date)}>➕</button>
    <p className="date">{dateContents}</p>
    <button className="calculate" onClick={props.runTheNumbers}>💱</button>
    {where(props)}
    <ul className="tickets">
      {props.tickets.map((ticket) =>
        <li key={ticket.id}>
          <PlayerTicket
            {...ticket}
            chooseSong={props.chooseSong}
            deleteTicket={props.removeTicket.bind(null, ticket.id)}
            removeSong={props.removeSong}
          />
        </li>
      )}
    </ul>
  </div>;
}

export default Show;

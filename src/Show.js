import React from "react";
import moment from "moment";

import PlayerTicket from "./PlayerTicket";

import "./Show.css";

function Show(props) {
  const location = props.location ? <p className="location">{props.location}</p> : false;
  const dateFormatted = moment(props.date).format("MMM D, YYYY");
  const dateContents = props.url ? <a href={props.url} target="_blank" rel="noopener noreferrer">{dateFormatted}</a> : dateFormatted;
  return <div className="show">
    <button onClick={props.removeShow} className="deleteShow">❌</button>
    <button className="addPerson" onClick={() => props.addPerson(props.date)}>➕</button>
    <p className="date">{dateContents}</p>
    <button className="calculate" onClick={props.runTheNumbers}>💱</button>
    {location}
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

import React, { Component } from "react";
import moment from "moment";

import PlayerTicket from "./PlayerTicket";

import "./Show.css";

class Show extends Component {
  render() {
    const location = this.props.location ? <p className="location">{this.props.location}</p> : false;
    const dateFormatted = moment(this.props.date).format("MMM D, YYYY");
    const dateContents = this.props.url ? <a href={this.props.url} target="_blank" rel="noopener noreferrer">{dateFormatted}</a> : dateFormatted;
    return <div className="show">
      <button onClick={this.props.removeShow} className="deleteShow">❌</button>
      <button className="addPerson" onClick={() => this.props.addPerson(this.props.date)}>➕</button>
      <p className="date">{dateContents}</p>
      <button className="calculate" onClick={this.props.runTheNumbers}>💱</button>
      {location}
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

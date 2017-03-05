import React, { Component } from "react";
import moment from "moment";

import PlayerTicket from "./PlayerTicket";

import "./Show.css";

// ❌💱➕🎰🎼

class Show extends Component {
  render() {
    return <div className="show">
      <button onClick={this.props.removeShow} className="deleteShow">❌</button>
      <p className="date">{moment(this.props.date).format("MMM D, YYYY")}</p> {/* TODO print this nicer; include venue if possible */}
      <button className="calculate" onClick={this.props.runTheNumbers}>💱</button>
      <button className="addPerson" onClick={() => this.props.addPerson(this.props.date)}>➕</button>
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

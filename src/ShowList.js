import React, { Component } from "react";

import Show from "./Show";

import "./ShowList.css";

class ShowList extends Component {

  constructor(props) {
    super(props);
    this.convertShowToElement = this._convertShowToElement.bind(this);
  }

  _convertShowToElement([showDate, show]) {
    const ticketsForThisShow = Object.values(this.props.tickets).filter((ticket) => ticket.date === showDate);
    return <li key={show.date}>
      <Show
        {...show}
        tickets={ticketsForThisShow}
        addPerson={this.props.addPerson}
        chooseSong={this.props.chooseSong}
      />
    </li>;
  }

  render() {
    return <ul className="shows">
      {Object.entries(this.props.shows).map(this.convertShowToElement)}
    </ul>
  }
}

export default ShowList;

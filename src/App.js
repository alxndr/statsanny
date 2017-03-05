import React, { Component } from "react";
import { connect } from "react-redux";

import Actions from "./actions";
import ShowList from "./ShowList";

import "./App.css";

function getName() {
  return window.prompt("name?").trim();
}

function getShowDate() {
  const date = window.prompt("Date? YYYY-MM-DD").trim(); // TODO calendar prompt
  // TODO check that it's in the future or it exists on .net
  return date;
}

export class App extends Component {
  render() {
    return <div className="app">
      <h1>Statsanny</h1>
      <button className="addShow" onClick={this.props.addShow}>➕ show</button>
      <ShowList
        shows={this.props.shows}
        tickets={this.props.tickets}
        addPerson={this.props.addPerson}
        chooseSong={this.props.chooseSong}
        removeShow={this.props.removeShow}
        removeSong={this.props.removeSong}
        removeTicket={this.props.removeTicket}
        runTheNumbers={this.props.runTheNumbers}
      />
    </div>;
  }
}

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
    tickets: state.tickets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addPerson: (showDate) =>
      dispatch(Actions.addTicket(getName(), showDate))
        .then(() => dispatch(Actions.saveState())),
    addShow: () =>
      dispatch(Actions.addShow(getShowDate())) // TODO rename
        .then(() => dispatch(Actions.saveState())),
    chooseSong: (playerName, showDate) => // TODO rename this prop...
      dispatch(Actions.pickSong(playerName, showDate))
        .then(() => dispatch(Actions.saveState())),
    removeShow: (showDate) => {
      // TODO this should be something like dispatch confirmRemoveShow(showdate)
      if (global.confirm(`Really delete all entries for: ${showDate} ?\n\n(This can't be undone!)`)) {
        return dispatch(Actions.removeShow(showDate))
          .then(() => dispatch(Actions.saveState()));
      }
      return null;
    },
    removeSong: ({name, date, song}) =>
      dispatch(Actions.removeSong({name, date, song}))
        .then(() => dispatch(Actions.saveState())),
    removeTicket: (ticketId) =>
      dispatch(Actions.removeTicket(ticketId))
        .then(() => dispatch(Actions.saveState())),
    runTheNumbers: (show) =>
      dispatch(Actions.runTheNumbers(show))
        .then(() => dispatch(Actions.saveState())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

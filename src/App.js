import React, { Component } from "react";
import { connect } from "react-redux";

import Actions from "./actions";
import ShowList from "./ShowList";

import "./App.css";

function getName() {
  return window.prompt("name?").trim();
}

export class App extends Component {
  render() {
    return <div className="app">
      <h1>Statsanny</h1>
      <button className="addShow" onClick={this.props.promptForShowDate}>➕ show</button>
      <ShowList
        shows={this.props.shows}
        tickets={this.props.tickets}
        addPerson={this.props.addPerson}
        chooseSong={this.props.promptForSong}
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
      dispatch(Actions.addTickets(getName(), showDate))
        .then(() => dispatch(Actions.saveState())),
    promptForSong: (playerName, showDate) =>
      dispatch(Actions.promptForSong(playerName, showDate))
        .then(() => dispatch(Actions.saveState())),
    promptForShowDate: () =>
      dispatch(Actions.promptForShowDate())
        .then((date) => dispatch(Actions.loadShowData(date)))
        .then(() => dispatch(Actions.saveState())),
    removeShow: (showDate) =>
      dispatch(Actions.confirmRemoveShow(showDate))
        .then(() => dispatch(Actions.removeShow(showDate)))
        .then(() => dispatch(Actions.saveState())),
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

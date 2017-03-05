import React from "react";
import { connect } from "react-redux";

import Actions from "./actions";
import ShowList from "./ShowList";

import "./App.css";

function getName() {
  return window.prompt("name?").trim();
}

export function App(props) {
  return <div className="app">
    <h1>Statsanny</h1>
    <button className="addShow" onClick={props.promptForShowDate}>➕ show</button>
    <ShowList
      shows={props.shows}
      tickets={props.tickets}
      addPerson={props.addPerson}
      chooseSong={props.promptForSong}
      removeShow={props.removeShow}
      removeSong={props.removeSong}
      removeTicket={props.removeTicket}
      runTheNumbers={props.runTheNumbers}
    />
  </div>;
}

const mapStateToProps = (state) => ({
  shows: state.shows,
  tickets: state.tickets,
});

const mapDispatchToProps = (dispatch) => ({
  addPerson: (showDate) =>
    dispatch(Actions.addTickets({names: getName(), date: showDate}))
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
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

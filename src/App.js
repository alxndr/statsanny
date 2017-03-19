import React from "react";
import { connect } from "react-redux";

import Actions from "./actions";
import ShowList from "./ShowList";
import console from "./console";

import "./App.css";

export function App(props) {
  return <div className="app">
    <button className="addShow" onClick={props.promptForShowDate}>➕ show</button>
    <button className="sync" disabled={props.isSyncInProgress} onClick={props.syncData}>🔄</button>
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
  isSyncInProgress: state.isSyncInProgress,
  shows: state.shows,
  tickets: state.tickets,
});

const mapDispatchToProps = (dispatch) => ({

  addPerson: (showDate) =>
    dispatch(Actions.addTickets({names: window.prompt("name?").trim(), date: showDate}))
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

  syncData: () =>
    dispatch(Actions.setSync(true))
      .then(() => dispatch(Actions.syncData()))
      .then(() => dispatch(Actions.setSync(false)))
      .catch((error) => {
        console.error(error, error.stack);
        return dispatch(Actions.setSync(false));
      }),

});

export default connect(mapStateToProps, mapDispatchToProps)(App);

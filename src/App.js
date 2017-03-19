import React from "react";
import { connect } from "react-redux";

import Actions from "./actions";
import ShowList from "./ShowList";
import console from "./console";

import "./App.css";

export class App extends React.PureComponent {
  componentDidMount() {
    this.props.onMount();
  }

  render() {
    return <div className="app">
      <button className="addShow" onClick={this.props.promptForShowDate}>➕ show</button>
      <button className="sync" disabled={this.props.isSyncInProgress} onClick={this.props.syncData}>🔄</button>
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

const mapStateToProps = (state) => ({
  isSyncInProgress: state.isSyncInProgress,
  shows: state.shows,
  tickets: state.tickets,
});

const mapDispatchToProps = (dispatch) => ({

  addPerson: (showDate) =>
    dispatch(Actions.addTickets({names: window.prompt("name?").trim(), date: showDate}))
      .then(() => dispatch(Actions.saveState())),

  onMount: () => dispatch(Actions.onMount()),

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

import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "redux-actions";

import ShowList from "./ShowList";
import { findAlias } from "./song-helper";

import "./App.css";

function putIntoLocalStorage(state) {
  console.log("savin it!", state);
  if (global.localStorage) {
    global.localStorage.state = JSON.stringify(state);
  }
}

function getName() {
  return window.prompt("name?").trim();
}

function getShowDate() {
  const date = window.prompt("Date? YYYY-MM-DD").trim(); // TODO calendar prompt
  // TODO check that it's in the future or it exists on .net
  return date;
}

class App extends Component {
  render() {
    return <div className="app">
      <button className="addShow" onClick={this.props.addShow}>add a show...</button>
      <ShowList
        shows={this.props.shows}
        tickets={this.props.tickets}
        addPerson={this.props.addPerson}
        chooseSong={this.props.chooseSong}
      />
    </div>;
  }
}

// TODO move actions
const addTicket = createAction("ADD_TICKET", (name, date) => Promise.resolve({name, date}));
const addShow = createAction("ADD_SHOW", (date) => Promise.resolve(date));
const chooseSong = createAction("CHOOSE_SONG", (playerName, date) => {
  let pick = window.prompt("What's your pick?").trim();
  if (!pick.length) {
    return;
  }
  const aliasedTo = findAlias(pick);
  if (aliasedTo) {
    pick = window.prompt("Did you mean...", aliasedTo).trim();
  }
  // TODO check for already picked...
  return Promise.resolve({
    playerName,
    date,
    song: pick
  });
});
const saveState = () => (_, getState) => Promise.resolve(putIntoLocalStorage(getState()));

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
    tickets: state.tickets,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    addPerson: (showDate) =>
      dispatch(addTicket(getName(), showDate))
      .then(() => dispatch(saveState())),
    addShow: () =>
      dispatch(addShow(getShowDate()))
      .then(() => dispatch(saveState())),
    chooseSong: (playerName, showDate) =>
      dispatch(chooseSong(playerName, showDate))
      .then(() => dispatch(saveState())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from "react";
import { connect } from "react-redux";
import { createAction } from "redux-actions";

import ShowList from "./ShowList";

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
const chooseSong = createAction("CHOOSE_SONG", (playerName, date) => Promise.resolve({playerName, date, song: prompt("what song?")}));
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

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
      <ShowList shows={this.props.shows} addPerson={this.props.addPerson} />
    </div>;
  }
}

// TODO move actions
const addPerson = createAction("ADD_PERSON", (name, date) => Promise.resolve({name, date}));
const addShow = createAction("ADD_SHOW", (date) => Promise.resolve(date));
const saveState = () => (_, getState) => Promise.resolve(putIntoLocalStorage(getState()));

const mapStateToProps = (state) => {
  return {
    shows: state.shows,
  };
};

const mapDispatchToProps = (dispatch, getState) => {
  return {
    addPerson: (showDate) =>
      dispatch(addPerson(getName(), showDate))
      .then(() => dispatch(saveState())),
    addShow: () =>
      dispatch(addShow(getShowDate()))
      .then(() => dispatch(saveState())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

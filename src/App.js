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
      dispatch(Actions.addShow(getShowDate()))
      .then(() => dispatch(Actions.saveState())),
    chooseSong: (playerName, showDate) =>
      dispatch(Actions.chooseSong(playerName, showDate))
      .then(() => dispatch(Actions.saveState())),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

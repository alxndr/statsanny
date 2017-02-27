import { createAction } from "redux-actions";

import { findAlias } from "./song-helper";

import { extractJson } from "./utils";

const apiKey = prompt("key?");

const addShow = createAction("ADD_SHOW", (date) => Promise.resolve(date));

const addTicket = createAction("ADD_TICKET", (name, date) => Promise.resolve({name, date}));

const addSong = createAction("ADD_SONG", (playerName, date) => {
  let pick = window.prompt("What's your pick?").trim();
  if (!pick.length) {
    return Promise.reject("missing a pick");
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

const removeShow = createAction("REMOVE_SHOW", (date) => Promise.reject(date));

const removeSong = createAction("REMOVE_SONG", ({name, date, song}) => Promise.resolve({name, date, song}));

const removeTicketAction = createAction("REMOVE_TICKET", (ticket) => Promise.resolve(ticket)); // TODO this should just be one action
const removeTicket = (ticketId) => {
  return (dispatch, getState) => {
    const ticket = getState().tickets[ticketId]; // TODO can we do getState in App's mapDispatchToProps?
    if (!ticket) {
      global.alert(`Uh oh, something went wrong... no record of ticket ${ticketId}`);
      return Promise.reject(`ticketId not found: ${ticketId}`);
    }
    if (global.confirm(`Really delete ${ticket.name}'s picks for ${ticket.date}??\n\n(This can't be undone!)`)) {
      return dispatch(removeTicketAction(ticket))
        .then(() => dispatch(saveState()));
    }
    return Promise.resolve(`not deleting ticketId ${ticketId}`);
  };
};

function putIntoLocalStorage(state) {
  if (global.localStorage) {
    global.localStorage.state = JSON.stringify(state);
  }
}

const saveState = () => (_, getState) => Promise.resolve(putIntoLocalStorage(getState()));

const scoreShow = createAction("SCORE_SHOW", (show) => {
  console.log("scoring show...", show);
  return fetch(`https://api.phish.net/v3/setlists/get?showdate=${show.date}&apikey=${apiKey}`)
    .then(extractJson)
    .then(({data}) => {
      if (!data) {
        throw new Error("No data from .net!");
      }
      console.log("got data!", data);
    });
});

export default {
  addShow,
  addTicket,
  addSong,
  removeShow,
  removeSong,
  removeTicket,
  saveState,
  scoreShow,
};

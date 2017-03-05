import { createAction } from "redux-actions";

import { findAlias } from "./song-helper";

import { extractJson } from "./utils";

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

const removeShow = createAction("REMOVE_SHOW", (date) => Promise.resolve(date));

const removeSong = createAction("REMOVE_SONG", ({name, date, song}) => Promise.resolve({name, date, song}));

function putIntoLocalStorage(state) {
  if (global.localStorage) {
    global.localStorage.state = JSON.stringify(state);
  }
}

const saveState = () => (_, getState) => Promise.resolve(putIntoLocalStorage(getState()));

const removeTicketAction = createAction("REMOVE_TICKET", (ticket) => Promise.resolve(ticket)); // TODO this should just be one action
const removeTicket = (ticket) => {
  return (dispatch) => {
    if (global.confirm(`Really delete ${ticket.name}'s picks for ${ticket.date}??\n\n(This can't be undone!)`)) {
      return dispatch(removeTicketAction(ticket))
        .then(() => dispatch(saveState()));
    }
    return Promise.resolve(`not deleting ticket ${ticket.id}`);
  };
};

function makeUrl(date) {
  return `http://curtain-with.herokuapp.com/api/setlists/get?date=${date}`;
}

const loadPlaylist = createAction("LOAD_PLAYLIST", (show) => {
  return fetch(makeUrl(show.date))
    .then(extractJson)
    .then(({data}) => {
      return {
        date: show.date,
        setlist: data.setlist,
      };
    });
});

const scoreShow = createAction("SCORE_SHOW");

const runTheNumbers = (show) => (dispatch, _getState) => {
  return dispatch(loadPlaylist(show))
    .then(() => dispatch(scoreShow(show)));
};

export default {
  addShow,
  addTicket,
  addSong,
  removeShow,
  removeSong,
  removeTicket,
  runTheNumbers,
  saveState,
};

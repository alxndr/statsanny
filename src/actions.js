import { createAction } from "redux-actions";

import { songAliasFor } from "./phishStuff";
import { extractJson } from "./utils";

const promptForShowDate = () => (_dispatch, _getState) => {
  const date = (window.prompt("Date? YYYY-MM-DD", "YYYY-MM-DD") || "").trim() || false; // TODO replace with some GUI
  if (date) {
    return Promise.resolve(date);
  }
  return Promise.reject("no date");
};

const loadShowData = createAction("LOAD_SHOW_DATA", (date) => {
  return fetch(makeUrl(date))
    .then(extractJson)
    .then(({data}) => {
      if (data && data.showdate) {
        return {
          date: data.showdate,
          location: data.location,
          setlist: data.setlist,
          url: data.url,
          venue: data.venue,
        };
      }
      return {
        date
      };
    });
});

const addTicket = createAction("ADD_TICKET", (name, date) => Promise.resolve({name, date}));

const addSong = createAction("ADD_SONG", (song, playerName, date) => {
  return Promise.resolve({
    playerName,
    date,
    song,
  });
});

const REGEX_NON_ALPHANUMERIC = /[^a-z0-9]/g;
function sanitize(string) {
  return string.replace(REGEX_NON_ALPHANUMERIC, "");
}

const promptForSong = (playerName, showDate) => (dispatch, getState) => {
  const {shows, tickets} = getState();
  const ticketsForShow = shows[showDate].tickets.map((ticketId) => tickets[ticketId]);
  const songsSanitized = ticketsForShow
    .reduce((songs, ticket) => songs.concat(ticket.songs.map((song) => song.title)), [])
    .map(sanitize);
  let pick = null;
  while (!pick // eslint-disable-line no-cond-assign
      || !(pick = pick.trim())
      || songsSanitized.includes(sanitize(pick))
  ) {
    const alreadyPickedMessage = pick
      ? `Uh oh, someone already picked ${pick}...\n`
      : "";
    pick = window.prompt(`${alreadyPickedMessage}What is ${playerName} picking?`); // TODO edit on doc; uniq
    const aliasedTo = songAliasFor(pick);
    if (aliasedTo) {
      pick = window.prompt("Did you mean...", aliasedTo).trim();
    }
  }
  return dispatch(addSong(pick, playerName, showDate));
};

const removeShow = createAction("REMOVE_SHOW", (date) => Promise.resolve(date));

const removeSong = createAction("REMOVE_SONG", ({name, date, song}) => Promise.resolve({name, date, song}));

function putIntoLocalStorage(state) {
  if (global.localStorage) {
    global.localStorage.state = JSON.stringify(state);
  }
}

const saveState = () => (_, getState) => Promise.resolve(putIntoLocalStorage(getState()));

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

function makeUrl(date) {
  return `//curtain-with.herokuapp.com/api/setlists/get?date=${date}`;
}

const scoreShow = createAction("SCORE_SHOW");

const runTheNumbers = (show) => (dispatch, _getState) => {
  return dispatch(loadShowData(show.date))
    .then(() => dispatch(scoreShow(show)));
};

export default {
  addTicket,
  addSong,
  loadShowData,
  promptForSong,
  promptForShowDate,
  removeShow,
  removeSong,
  removeTicket,
  runTheNumbers,
  saveState,
};

import { createAction } from "redux-actions";
import { stringify as queryString } from "query-string";

import { songAliasFor } from "./phishStuff";
import {
  catchPromise,
  extractJson,
  objectWithoutKey,
  patch,
  post,
  reduceObject,
  sanitizeString,
  trimString,
} from "./utils";

const promptForShowDate = () => () => {
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

const addTickets = createAction("ADD_TICKETS", (data) => Promise.resolve(data));

const addSongs = createAction("ADD_SONGS", (songs, playerName, date) => Promise.resolve({date, playerName, songs}));

const confirmRemoveShow = createAction("CONFIRM_REMOVE_SHOW", (showDate) => {
  if (global.confirm(`Really delete all entries for: ${showDate} ?\n\n(This can't be undone!)`)) {
    return Promise.resolve(showDate);
  }
  return Promise.reject(`not removing all entries for ${showDate}`);
});

const backend = "//curtain-with.herokuapp.com";

function getHouse(houseName) {
  return function(dispatch) {
    return fetch(`${backend}/house/find?${queryString({name: houseName})}`)
      .then(extractJson)
      .catch(catchPromise(`Error fetching ${houseName} from ${backend}`))
    ;
  };
}

const promptForSong = (playerName, showDate) => (dispatch, getState) => {
  const {shows, tickets} = getState();
  const ticketsForShow = shows[showDate].tickets.map((ticketId) => tickets[ticketId]);
  const songsSanitized = ticketsForShow
    .reduce((songs, ticket) => songs.concat(ticket.songs.map((song) => song.title)), [])
    .map(sanitizeString);
  let picks = [];
  let alreadyPicked = null;
  while (!picks.length // eslint-disable-line no-cond-assign
      || (alreadyPicked = picks.find((pick) => songsSanitized.includes(sanitizeString(pick))))
  ) {
    const messages = [];
    if (alreadyPicked) {
      messages.push(`Uh oh, someone already picked ${alreadyPicked}...`);
    }
    messages.push(`What is ${playerName} picking?`);
    picks = window.prompt(messages.join("\n\n")) // TODO could sanitize prompt() result and check if it's a song before splitting on commas
      .split(",")
      .map(trimString)
      .map((pick) => songAliasFor(pick) || pick);
  }
  return dispatch(addSongs(picks, playerName, showDate));
};

const removeShow = createAction("REMOVE_SHOW");

const removeSong = createAction("REMOVE_SONG", (data) => Promise.resolve(data));

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

const runTheNumbers = (show) => (dispatch) => {
  return dispatch(loadShowData(show.date))
    .then(() => dispatch(scoreShow(show)));
};

const setSync = createAction("SET_SYNC", (bool) => Promise.resolve(bool));

function dataToSync({shows, tickets}) {
  return {
    shows: reduceObject(shows, (cleanedShows, [showDate, showData]) => {
      cleanedShows[showDate] = objectWithoutKey(showData, "songsPlayed");
      return cleanedShows;
    }),
    tickets,
  };
}

const syncData = () => (dispatch, getState) => {
  const {houseName, shows, tickets} = getState();
  return getHouse(houseName)
    .then(({data}) => {
      const book = dataToSync({shows, tickets});
      if (data) {
        const houseId = data.id;
        return patch(`${backend}/houses/${houseId}`, {house: {book}});
      }
      const theHouse = {
        name: houseName,
        book,
      };
      return post(`${backend}/houses`, {house: theHouse});
    })
  ;
};

export default {
  addTickets,
  addSongs,
  confirmRemoveShow,
  loadShowData,
  promptForSong,
  promptForShowDate,
  removeShow,
  removeSong,
  removeTicket,
  runTheNumbers,
  saveState,
  setSync,
  syncData,
};

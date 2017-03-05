import { createAction } from "redux-actions";

import { songAliasFor } from "./phishStuff";
import { extractJson } from "./utils";

const addShow = createAction("ADD_SHOW", (date) => {
  return fetch(makeUrl(date))
    .then(extractJson)
    .then(({data}) => {
      console.log("all data from c/w", data);
      return {
        date: data.showdate,
        location: data.location,
        /* setlist: data.setlist,*/ // TODO shouldn't have to fetch again for LOAD_PLAYLIST...
        url: data.url,
        venue: data.venue,
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

const pickSong = (playerName, showDate) => (dispatch, getState) => {
  let pick = null;
  const state = getState();
  const theShow = state.shows[showDate];
  const tickets = theShow.tickets.map((ticketId) => state.tickets[ticketId]);
  const songsPicked = tickets.reduce((songs, ticket) => songs.concat(ticket.songs.map((song) => song.title)), []);
  const songsSanitized = songsPicked.map(sanitize);
  while (!pick || !(pick = pick.trim()) || songsSanitized.includes(sanitize(pick))) {
    pick = window.prompt(`What is ${playerName} picking?`); // TODO edit on doc; uniq
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
  addSong, // TODO rename
  pickSong,
  removeShow,
  removeSong,
  removeTicket,
  runTheNumbers,
  saveState,
};

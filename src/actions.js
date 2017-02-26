import { createAction } from "redux-actions";

import { findAlias } from "./song-helper";

const addShow = createAction("ADD_SHOW", (date) => Promise.resolve(date));

const addTicket = createAction("ADD_TICKET", (name, date) => Promise.resolve({name, date}));

const chooseSong = createAction("CHOOSE_SONG", (playerName, date) => {
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

function putIntoLocalStorage(state) {
  if (global.localStorage) {
    global.localStorage.state = JSON.stringify(state);
  }
}

const saveState = () => (_, getState) => Promise.resolve(putIntoLocalStorage(getState()));

export default {
  addShow,
  addTicket,
  chooseSong,
  saveState,
};

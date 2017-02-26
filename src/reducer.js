const initialState = {
  shows: {},
  tickets: {},
};

function loadState() {
  try {
    return global.localStorage
      && global.localStorage.state
      && JSON.parse(global.localStorage.state)
      || initialState;
  } catch (_error) {
    return initialState;
  }
}

function newTicket(playerName, date) {
  return {
    id: [date, playerName].join("-"),
    date,
    name: playerName,
    songs: [],
  };
}

function buildNewObject(newObj, [key, val]) {
  newObj[key] = val;
  return newObj;
}

function objectWithoutKey(obj, keyToRemove) {
  return Object.entries(obj)
    .filter(([key, _]) => key !== keyToRemove)
    .reduce(buildNewObject, {});
}

function objectWithoutKeys(obj, keysToRemove) {
  return Object.entries(obj)
    .filter(([key, _]) => !keysToRemove.includes(key))
    .reduce(buildNewObject, {});
}

function reducer(state = loadState(), action) {
  const payload = action.payload;
  switch (action.type) {

  case "ADD_SHOW": {
    const showDate = action.payload;
    const newShow = {
      date: showDate,
      tickets: [],
    };
    return {
      ...state,
      shows: {
        ...state.shows,
        [showDate]: newShow,
      },
    };
  }

  case "ADD_TICKET": {
    const theShow = state.shows[payload.date];
    const ticket = newTicket(payload.name, payload.date);
    return {
      ...state,
      tickets: {
        ...state.tickets,
        [ticket.id]: ticket,
      },
      shows: {
        ...state.shows,
        [payload.date]: {
          ...theShow,
          tickets: [
            ...theShow.tickets,
            ticket.id,
          ],
        },
      },
    };
  }

  case "CHOOSE_SONG": {
    const theTicket = state.tickets[`${payload.date}-${payload.playerName}`];
    return {
      ...state,
      tickets: {
        ...state.tickets,
        [theTicket.id]: {
          ...theTicket,
          songs: [
            ...theTicket.songs,
            { title: payload.song }
          ]
        }
      }
    };
  }

  case "REMOVE_SHOW": {
    const show = state.shows[payload];
    const ticketsForShow = Object.values(state.tickets).filter((ticket) => show.tickets.includes(ticket.id));
    return {
      ...state,
      shows: objectWithoutKey(state.shows, show.date),
      tickets: objectWithoutKeys(state.tickets, ticketsForShow.map((ticket) => ticket.id)),
    };
  }

  case "REMOVE_TICKET":
    return {
      ...state,
      tickets: objectWithoutKey(state.tickets, payload.id),
    };

  default:
    global.console.info("reducer saw unhandled action", state, action);
    return state;
  }
}

export default reducer;

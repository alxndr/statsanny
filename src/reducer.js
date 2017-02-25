import slugify from "slugify";

const initialState = {
  shows: [],
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

function showFor(date) {
  return {
    date,
    players: [],
    picks: {}
  };
}

function nameToPlayer(name) {
  name = name.trim();
  return {
    name,
    picks: [],
    points: 0,
    slug: slugify(name),
  };
}

function reducer(state = loadState(), action) {
  const payload = action.payload;
  switch (action.type) {

    case "ADD_SHOW": {
      const showDate = action.payload;
      return {
        ...state,
        shows: [showFor(showDate), ...state.shows],
      };
    }

    case "ADD_PERSON": {
      const theShowIndex = state.shows.findIndex((show) => show.date === payload.date);
      const showWithNewPlayer = {
        ...state.shows[theShowIndex],
        players: [nameToPlayer(payload.name), ...state.shows[theShowIndex].players]
      };
      return {
        ...state,
        shows: [
          ...state.shows.slice(0, theShowIndex),
          showWithNewPlayer,
          ...state.shows.slice(theShowIndex + 1)
        ]
      };
    }

    default:
      global.console.info("reducer saw unhandled action", state, action);
      return state;
  }
}

export default reducer;

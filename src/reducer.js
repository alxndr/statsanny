import { arrayWithoutElement, objectWithoutKey, objectWithoutKeys, slugify } from "./utils";

const initialState = {
  shows: {},
  tickets: {},
};

function loadState() {
  try {
    return global.localStorage
      && global.localStorage.state
      && JSON.parse(global.localStorage.state) // eslint-disable-line no-mixed-operators
      || initialState; // eslint-disable-line no-mixed-operators
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

function pointsFor(song) {
  if (!song) {
    return 0;
  }
  let score = 1;
  if (song.isOpener) {
    score += 2;
  }
  if (song.isEncore) {
    score += 1;
  }
  return score;
}

function scoreTicket(ticket, show) {
  const scoredSongs = ticket.songs.reduce((songsScored, song) => {
    songsScored.push({
      ...song,
      points: pointsFor(show.songsPlayed[slugify(song.title)]),
    });
    return songsScored;
  }, []);
  const songsWithPoints = scoredSongs.filter((song) => song.points > 0);
  return {
    ...ticket,
    songs: scoredSongs,
    score: songsWithPoints.map((song) => song.points).reduce((a, b) => a + b, 0),
  };
}

const REGEX_THINGS_IN_ANGLE_BRACKETS = /<[^>]*?>/g;
function stripHtml(string) {
  return string.replace(REGEX_THINGS_IN_ANGLE_BRACKETS, "");
}

function reducer(state = loadState(), action) {
  const payload = action.payload;
  switch (action.type) {

  case "ADD_SHOW": {
    const newShow = {
      date: payload.date,
      location: `@ ${stripHtml(payload.venue)}, ${payload.location}`,
      tickets: [],
      url: payload.url,
    };
    return {
      ...state,
      shows: {
        ...state.shows,
        [payload.date]: newShow,
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

  case "ADD_SONG": {
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

  case "LOAD_PLAYLIST": {
    const songsPlayed = Object.entries(payload.setlist).reduce((processedSongs, [setName, rawSet]) => {
      const isEncore = rawSet.length < 5; // meh
      return rawSet.reduce((pS, song, index) => {
        pS[slugify(song.title)] = {
          title: song.title,
          isEncore,
          isOpener: index === 0 && !isEncore,
        };
        return pS;
      }, processedSongs);
    }, {});
    return {
      ...state,
      shows: {
        ...state.shows,
        [payload.date]: {
          ...state.shows[payload.date],
          songsPlayed,
        },
      },
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

  case "REMOVE_SONG": {
    const {date, name, song} = payload;
    const ticketId = `${date}-${name}`;
    const ticket = state.tickets[ticketId];
    return {
      ...state,
      tickets: {
        ...state.tickets,
        [ticketId]: {
          ...ticket,
          songs: arrayWithoutElement(ticket.songs, song)
        },
      },
    };
  }

  case "REMOVE_TICKET": {
    const ticketToRemove = payload;
    const show = state.shows[ticketToRemove.date];
    return {
      ...state,
      shows: {
        ...state.shows,
        [show.date]: {
          ...show,
          tickets: show.tickets.filter((ticketId) => ticketId !== ticketToRemove.id),
        },
      },
      tickets: objectWithoutKey(state.tickets, ticketToRemove.id),
    };
  }

  case "SCORE_SHOW": {
    const show = payload;
    console.log("scoring", show);
    return {
      ...state,
      tickets: {
        ...state.tickets,
        ...show.tickets.reduce((scoredTickets, ticketId) => {
          const ticket = state.tickets[ticketId];
          scoredTickets[ticketId] = scoreTicket(ticket, state.shows[show.date]);
          return scoredTickets;
        }, {}),
      }
    };
  }

  default:
    global.console.info("reducer saw unhandled action", state, action);
    return state;
  }
}

export default reducer;

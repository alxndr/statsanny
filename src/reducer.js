import { arrayWithoutElement, objectWithoutKey, objectWithoutKeys, sanitizeString, trimString } from "./utils";
import console from "./console";

function createInitialState() {
  return {
    houseName: global.prompt("What's the name of the House?"),
    isSyncInProgress: false,
    shows: {},
    tickets: {},
  };
}

function loadState() {
  if (global.localStorage) {
    const {state} = global.localStorage;
    let localState;
    try {
      localState = JSON.parse(state);
      // TODO want to load data from backend if there's nothing in local storage
    } catch (error) {
      console.error(error, error.stack);
    }
    if (localState) {
      return localState;
    }
  }
  return createInitialState();
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

function pointsForSongIn(show) {
  return (song) => ({
    ...song,
    points: pointsFor(show.songsPlayed[sanitizeString(song.title)]),
  });
}

function sanitizeTitle(song) {
  return sanitizeString(song.title);
}

function sum(a, b) {
  return a + b;
}

function scoreTicket(ticket, show) {
  const scoredSongs = ticket.songs.map(pointsForSongIn(show));
  const songsWithPoints = scoredSongs.filter((song) => song.points > 0);
  let bonusPoints = 0;
  if (songsWithPoints.length === ticket.songs.length) {
    bonusPoints += 1;
  }
  const encoreSongs = Object.values(show.songsPlayed).filter((song) => song.isEncore, []);
  const firstEncoreSongNotPicked = encoreSongs.find((encoreSong) => {
    const encoreSongTitleSanitized = sanitizeString(encoreSong.title);
    return !ticket.songs.map(sanitizeTitle).includes(encoreSongTitleSanitized);
  });
  if (!firstEncoreSongNotPicked) {
    bonusPoints += 1;
  }
  return {
    ...ticket,
    songs: scoredSongs,
    score: songsWithPoints.map((song) => song.points).reduce(sum, 0) + bonusPoints,
  };
}

const REGEX_THINGS_IN_ANGLE_BRACKETS = /<[^>]*?>/g;
function stripHtml(string = "") {
  return string.replace(REGEX_THINGS_IN_ANGLE_BRACKETS, "");
}

function cleanLocation(rawLocation = "") {
  return rawLocation
    .replace(" , ", " ")
    .replace(", USA", "");
}

function reducer(state = loadState(), action) {
  const payload = action.payload;
  switch (action.type) {

  case "ADD_TICKETS": {
    const theShow = state.shows[payload.date];
    const names = payload.names.split(",").map(trimString);
    const newTickets = names.map((name) => newTicket(name, payload.date));
    return {
      ...state,
      tickets: {
        ...state.tickets,
        ...newTickets.reduce((tickets, newTicket) => {
          tickets[newTicket.id] = newTicket;
          return tickets;
        }, {}),
      },
      shows: {
        ...state.shows,
        [payload.date]: {
          ...theShow,
          tickets: [
            ...theShow.tickets,
            ...newTickets.map((ticket) => ticket.id),
          ],
        },
      },
    };
  }

  case "ADD_SONGS": {
    const theTicket = state.tickets[`${payload.date}-${payload.playerName}`];
    return {
      ...state,
      tickets: {
        ...state.tickets,
        [theTicket.id]: {
          ...theTicket,
          songs: [
            ...theTicket.songs,
            ...payload.songs.map((song) => ({ title: song }))
          ]
        }
      }
    };
  }

  case "LOAD_SHOW_DATA": {
    if (!state.shows[payload.date]) {
      const newShow = {
        date: payload.date,
        location: cleanLocation(stripHtml(payload.location)),
        tickets: [],
        url: payload.url,
        venue: stripHtml(payload.venue),
      };
      return {
        ...state,
        shows: {
          ...state.shows,
          [payload.date]: newShow,
        },
      };
    }
      // ...
    const songsPlayed = payload.setlist
      ? Object.entries(payload.setlist).reduce((processedSongs, [_setName, rawSet]) => {
        const isEncore = rawSet.length < 5; // meh. the setName isn't very exact... but neither is this.
        return rawSet.reduce((pS, song, index) => {
          pS[sanitizeString(song.title)] = {
            title: song.title,
            isEncore,
            isOpener: index === 0 && !isEncore,
          };
          return pS;
        }, processedSongs);
      }, {})
      : {};
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

  case "@@INIT":
    return state;

  default:
    console.warn("reducer saw unhandled action", state, action);
    return state;
  }
}

export default reducer;

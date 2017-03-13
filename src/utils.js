import console from "./console";

const REGEX_ELIDABLE_CHARACTERS = /['.]/g;
const REGEX_REPLACEABLE_CHARACTERS = /[^a-z0-9]+/g;
const REGEX_STARTING_TRAILING_HYPHENS = /^-+|-+$/g;

export function arrayWithoutElement(array, element) {
  if (!array.includes(element)) {
    console.warn("Element", element, "not found in array", array);
    return array;
  }
  const index = array.indexOf(element);
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ];
}

function buildNewObject(newObj, [key, val]) {
  newObj[key] = val;
  return newObj;
}

export function extractJson(response) {
  return response.json();
}

export function objectWithoutKey(obj, keyToRemove) {
  return Object.entries(obj)
    .filter(([key, _]) => key !== keyToRemove)
    .reduce(buildNewObject, {});
}

export function objectWithoutKeys(obj, keysToRemove) {
  return Object.entries(obj)
    .filter(([key, _]) => !keysToRemove.includes(key))
    .reduce(buildNewObject, {});
}

export function patch(url, data) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
}

export function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });
}

export function reduceObject(obj, fn) {
  return Object.entries(obj).reduce(fn, {});
}

const REGEX_NON_ALPHANUMERIC = /[^a-z0-9]/g;
export function sanitizeString(string) {
  return string.toLowerCase().replace(REGEX_NON_ALPHANUMERIC, "");
}

export function slugify(term) {
  // lowercase, strips out some characters/punctuation, replaces everything non-alphanum with a hyphen
  if (!term || !term.trim) {
    return false;
  }
  term = term.trim().toLowerCase().replace(REGEX_ELIDABLE_CHARACTERS, "");
  if (!term.length) {
    return false;
  }
  return term.replace(REGEX_REPLACEABLE_CHARACTERS, "-").replace(REGEX_STARTING_TRAILING_HYPHENS, "");
}

export function trimString(string = "") {
  return string.trim();
}

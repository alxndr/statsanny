const REGEX_ELIDABLE_CHARACTERS = /['.]/g;
const REGEX_REPLACEABLE_CHARACTERS = /[^a-z0-9]+/g;
const REGEX_STARTING_TRAILING_HYPHENS = /^-+|-+$/g;

function arrayWithoutElement(array, element) {
  if (!array.includes(element)) {
    global.console.warn("Element", element, "not found in array", array);
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

function slugify(term) {
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

export {
  arrayWithoutElement,
  objectWithoutKey,
  objectWithoutKeys,
  slugify
}

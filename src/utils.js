const REGEX_ELIDABLE_CHARACTERS = /['\.]/g;
const REGEX_REPLACEABLE_CHARACTERS = /[^a-z0-9]+/g;
const REGEX_STARTING_TRAILING_HYPHENS = /^-+|-+$/g;

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
  slugify
}

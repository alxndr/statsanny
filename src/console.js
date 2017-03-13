function noop() {}

const c = global.console ? global.console : {};

export default {
  error: c.error ? c.error : noop,
  log:   c.log   ? c.log   : noop,
  warn:  c.warn  ? c.warn  : noop,
};

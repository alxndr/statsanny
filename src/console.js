function noop() {}

const console = {
  log: global.console && global.console.log ? global.console.log : noop,
  warn: global.console && global.console.warn ? global.console.warn : noop,
};

export default console;

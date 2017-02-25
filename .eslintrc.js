module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "extends": ["eslint:recommended"],
  "rules": {
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-console": ["warn"],
    "react/jsx-uses-react": ["error"],
    "react/jsx-uses-vars": ["error"]
  }
};

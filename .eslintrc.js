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
    "comma-dangle": ["warn", "only-multiline"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "no-console": ["warn"],
    "react/jsx-uses-react": ["error"],
    "react/jsx-uses-vars": ["error"],
  }
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    mocha: true,
    node: true
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 'off',
    'no-underscore-dangle': 'off'
  },
};

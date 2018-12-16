module.exports = {
  extends: 'airbnb-base',
  plugins: ['jest'],
  env: {
    'jest/globals': true
  },
  overrides: [{
    files: ["*test*.js"],
    rules: {
      'global-require': 'off'
    }
  }],
};

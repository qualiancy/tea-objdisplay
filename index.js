module.exports = process.env.display_COV
  ? require('./lib-cov/display')
  : require('./lib/display');

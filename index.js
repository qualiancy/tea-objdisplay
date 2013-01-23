module.exports = process.env.display_COV
  ? require('./lib-cov/display.node')
  : require('./lib/display.node');

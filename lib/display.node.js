var type = require('tea-type');

var styles = require('./node/styles')
  , util = require('./node/util')

module.exports = function (style) {
  style = style || 'cdir';
  var fn = 'function' === type(style)
    ? style
    : 'function' === type(styles[style])
      ? styles[style]
      : null;

  if (!fn) {
    throw new Error('Style not available.');
  }

  return function (obj) {
    var meta = util.meta(obj);
    return fn(meta);
  }
};

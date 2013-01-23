var tty = require('tty');

var istty = tty.isatty(1) && tty.isatty(2);

/**
 * # colorize(str, color)
 *
 * Provides helper to frame string with fg color
 * for use in the cli.
 *
 * @param {String} string to colorize
 * @param {String} color
 * @api utilites
 */

exports.colorize = function (str, color) {
  var options = {
      red:      '\u001b[31m'
    , green:    '\u001b[32m'
    , yellow:   '\u001b[33m'
    , blue:     '\u001b[34m'
    , magenta:  '\u001b[35m'
    , cyan:     '\u001b[36m'
    , gray:     '\u001b[90m'
    , reset:    '\u001b[0m'
  };

  return istty
    ? options[color] + str + options.reset
    : str;
};

/**
 * # highlight(str, color)
 *
 * Provides helper to frame string with bg color
 * for use in the cli.
 *
 * @param {String} string to colorize
 * @param {String} color
 * @api utilites
 */

exports.highlight = function (str, color) {
  var options = {
      red:      '\u001b[41m'
    , green:    '\u001b[42m'
    , yellow:   '\u001b[43m'
    , blue:     '\u001b[44m'
    , magenta:  '\u001b[45m'
    , cyan:     '\u001b[46m'
    , gray:     '\u001b[100m'
    , reset:    '\u001b[0m'
  };

  return istty
    ? options[color] + str + options.reset
    : str;
};

/**
 * # padBefore(str, width)
 *
 * Provides helper to frame string with spaces
 * before for use in the cli.
 *
 * @param {String} string to pad
 * @param {Number} width in characters
 * @api utilites
 */

exports.padBefore = function (str, width) {
  return Array(width - str.length).join(' ') + str;
};

/**
 * # padAfter(str, width)
 *
 * Provides helper to frame string with spaces
 * after for use in the cli.
 *
 * @param {String} string to pad
 * @param {Number} width in characters
 * @api utilites
 */

exports.padAfter = function (str, width) {
  return str + Array(width - str.length).join(' ');
};

var _ = require('../color');

module.exports = function (meta) {
  var buf = '';

  meta.forEach(function (line) {
    var delim = ''
      , desc = line.description;

    switch (line.type) {
      case 'object':
      case 'array':
        delim = '▾ '
        desc = _.colorize(desc, 'blue');
        break;
      case 'string':
        desc = _.colorize('"' + desc + '"', 'green');
        break;
      case 'number':
        desc = _.colorize(desc, 'magenta');
        break;
      case 'boolean':
        desc = _.colorize(desc, 'yellow');
        break;
      case 'regexp':
        desc = _.colorize(desc, 'red');
        break;
      case 'function':
        desc = _.colorize(desc, 'cyan');

    }

    var print = ('undefined' !== typeof line.key)
        ? _.colorize(line.key + ': ', 'gray') + delim + desc
        : delim + _.colorize(desc, 'blue')

    buf += ws(line.depth) + print + '\n';
  });

  return buf.substr(0, buf.length - 2);
}

function ws (d) {
  return Array(d + 2).join('  ');
}

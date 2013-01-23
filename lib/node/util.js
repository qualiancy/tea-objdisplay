var type = require('tea-type');

exports.decycle = function (obj) {
  var objects = [],
      paths = [];

  function derez (value, path) {
    var name, nu;

    switch (type(value)) {
      case 'object':
        if (!value) return null;

        for (var i = 0; i < objects.length; i += 1) {
          if (objects[i] === value) return '[Circular]';
        }

        objects.push(value);
        paths.push(path);

        if ('array' === type(value)) {
          nu = [];
          for (var i = 0; i < value.length; i += 1) {
            nu[i] = derez(value[i], path + '[' + i + ']');
          }
        } else {
          nu = {};
          for (name in value) {
            nu[name] = derez(value[name], path + '[' + JSON.stringify(name) + ']');
          }
        }

        return nu;
      default:
        return value;
        break;
    }
  }

  return derez(obj, '[Circular]');
};

exports.meta = function (input) {
  var meta = []
    , obj = exports.decycle(input)
    , seed = -1;

  function iterate (depth, node, desc) {
    var is = type(node);
    seed++;

    switch (is) {
      case 'object':
        meta.push({
            description: 'Object'
          , key: desc
          , depth: depth
          , index: seed
          , node: node
          , type: is
        });

        depth++;
        for (var key in node) {
          iterate(depth, node[key], key);
        }

        break;
      case 'string':
      case 'number':
      case 'boolean':
      case 'undefined':
      case 'null':
      case 'regexp':
        meta.push({
            description: node
          , key: desc
          , node: node
          , depth: depth
          , index: seed
          , type: is
        });

        break;
      case 'array':
        meta.push({
            description: 'Array'
          , key: desc
          , depth: depth
          , seed: seed
          , node: node
          , type: is
        });

        depth++;
        for (var i = 0, l = node.length; i < l; i++) {
          iterate(depth, node[i], i);
        }

        break;
      case 'function':
        meta.push({
            description: node.name
              ? '[Function ' + node.name + ']'
              : '[Function]'
          , key: desc
          , node: node
          , depth: depth
          , index: seed
          , type: is
        });

        break;
    }
  };

  iterate(0, obj);
  return meta;
}

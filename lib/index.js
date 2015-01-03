var api, output, scripts, table;

scripts = require('./scripts');

api = require('./formatter/api');

table = require('./formatter/table');

output = function(_arg) {
  var formatter, github;
  github = _arg.github, formatter = _arg.formatter;
  return function(scripts) {
    return console.log(formatter(['no', 'date', 'name', 'repo'].concat(github ? ['deprecated', 'image'] : []), scripts.map(function(script) {
      return [script.no, script.date, script.name, script.repo].concat(github ? [script.github.deprecated, script.github.image] : []);
    })));
  };
};

module.exports = function(options) {
  var force, format, github, _ref;
  _ref = options != null ? options : {}, github = _ref.github, force = _ref.force, format = _ref.format;
  return scripts({
    github: github,
    force: force
  }).then(output({
    github: github,
    formatter: (format === 'api' ? api : table)
  })).then((function() {
    return 0;
  }), function(e) {
    return console.error(e);
  });
};

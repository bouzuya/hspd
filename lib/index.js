var output, scripts, table;

scripts = require('./scripts');

table = require('./formatter/table');

output = function(_arg) {
  var github;
  github = _arg.github;
  return function(scripts) {
    return console.log(table(['no', 'date', 'name', 'repo'].concat(github ? ['deprecated', 'image'] : []), scripts.map(function(script) {
      return [script.no, script.date, script.name, script.repo].concat(github ? [script.github.deprecated(script.github.image)] : []);
    })));
  };
};

module.exports = function(options) {
  var force, github, _ref;
  _ref = options != null ? options : {}, github = _ref.github, force = _ref.force;
  return scripts({
    github: github,
    force: force
  }).then(output({
    github: github
  })).then((function() {
    return 0;
  }), function(e) {
    return console.error(e);
  });
};

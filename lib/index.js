var output, scripts, table;

scripts = require('./scripts');

table = require('./formatter/table');

output = function(scripts) {
  return console.log(table(['no', 'date', 'name', 'repo', 'deprecated', 'image'], scripts.map(function(script) {
    return [script.no, script.date, script.name, script.repo, script.github.deprecated, script.github.image];
  })));
};

scripts({}).then(output);

var CACHE_FILE, Promise, bbn, cacheFile, cached, fs, githubLoader, load, save;

Promise = require('es6-promise').Promise;

fs = require('fs');

bbn = require('./loader/bbn');

githubLoader = require('./loader/github');

CACHE_FILE = '.hspd.cache.json';

cacheFile = function() {
  return CACHE_FILE;
};

load = function() {
  var data, json;
  data = fs.readFileSync(cacheFile(), {
    encoding: 'utf-8'
  });
  json = JSON.parse(data);
  return Promise.resolve(json);
};

save = function(data) {
  var json;
  json = JSON.stringify(data);
  fs.writeFileSync(cacheFile(), json, {
    encoding: 'utf-8'
  });
  return data;
};

cached = function() {
  return fs.existsSync(cacheFile());
};

module.exports = function(_arg) {
  var force, github;
  github = _arg.github, force = _arg.force;
  if ((force != null ? force : false) || !cached()) {
    return bbn().then(function(scripts) {
      if (github) {
        return githubLoader(scripts);
      } else {
        return scripts;
      }
    }).then(save);
  } else {
    return load();
  }
};

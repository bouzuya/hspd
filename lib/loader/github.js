var Promise, fetch, request, timeout;

Promise = require('es6-promise').Promise;

request = require('../util/request-b');

timeout = require('../util/timeout');

fetch = function(script) {
  var baseUrl, repo, user;
  baseUrl = 'https://raw.githubusercontent.com';
  user = 'bouzuya';
  repo = script.name;
  return request({
    method: 'GET',
    url: "" + baseUrl + "/" + user + "/" + repo + "/master/README.md"
  }).then(function(res) {
    var deprecated, github, image, _, _ref, _ref1;
    deprecated = res.body.match(/DEPRECATION/) != null;
    _ref1 = (_ref = res.body.match(/!\[]\((.+\.gif)\)/)) != null ? _ref : [null, null], _ = _ref1[0], image = _ref1[1];
    github = {
      deprecated: deprecated,
      image: image
    };
    return script.github = github;
  }).then(function() {
    return timeout(500);
  });
};

module.exports = function(scripts) {
  return scripts.reduce(function(promise, script) {
    return promise.then(function() {
      return fetch(script);
    });
  }, Promise.resolve()).then(function() {
    return scripts;
  });
};

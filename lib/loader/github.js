var Promise, cheerio, request, timeout;

Promise = require('es6-promise').Promise;

cheerio = require('cheerio');

request = require('../util/request-b');

timeout = require('../util/timeout');

module.exports = function(scripts) {
  var promiseAll;
  promiseAll = scripts.reduce(function(promise, script) {
    return promise.then(function() {
      return request({
        method: 'GET',
        url: script.repo
      });
    }).then(function(res) {
      var $, deprecated, github, image;
      $ = cheerio.load(res.body);
      deprecated = $('.repository-description').text().match(/DEPRECATED/) != null;
      image = $('#readme article p a').filter(function() {
        return $(this).attr('href').match(/githubusercontent\.com/);
      }).length > 0;
      github = {
        deprecated: deprecated,
        image: image
      };
      return script.github = github;
    }).then(function() {
      return timeout(1000);
    });
  }, Promise.resolve());
  return promiseAll.then(function() {
    return scripts;
  });
};

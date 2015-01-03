var fetch, filter, map, request;

request = require('request-b');

fetch = function() {
  return request({
    method: 'GET',
    url: 'http://blog.bouzuya.net/posts.json',
    json: true
  }).then(function(res) {
    return res.body;
  });
};

filter = function(posts) {
  return posts.filter(function(post) {
    return post.tags.some(function(tag) {
      return tag === 'hubot-script-per-day';
    });
  });
};

map = function(posts) {
  return posts.map(function(post, i) {
    var name;
    name = post.title.match(/(hubot-\S+)\sをつくった/)[1];
    return {
      no: i + 1,
      date: post.date,
      name: name,
      repo: "https://github.com/bouzuya/" + name
    };
  });
};

module.exports = function() {
  return fetch().then(filter).then(map);
};

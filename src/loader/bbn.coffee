request = require 'request-b'

fetch = ->
  request
    method: 'GET'
    url: 'http://blog.bouzuya.net/posts.json'
    json: true
  .then (res) ->
    res.body

filter = (posts) ->
  posts.filter (post) ->
    post.tags.some (tag) ->
      tag is 'hubot-script-per-day'

map = (posts) ->
  posts.map (post, i) ->
    name = post.title.match(/(hubot-\S+)\sをつくった/)[1]
    no: i + 1
    date: post.date
    name: name
    repo: "https://github.com/bouzuya/#{name}"

module.exports = ->
  fetch()
    .then filter
    .then map

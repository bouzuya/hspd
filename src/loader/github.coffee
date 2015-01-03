{Promise} = require 'es6-promise'
request = require '../util/request-b'
timeout = require '../util/timeout'

fetch = (script) ->
  baseUrl = 'https://raw.githubusercontent.com'
  user = 'bouzuya'
  repo = script.name
  request
    method: 'GET'
    url: "#{baseUrl}/#{user}/#{repo}/master/README.md"
  .then (res) ->
    deprecated = res.body.match(/DEPRECATION/)?
    [_, image] = res.body.match(/!\[]\((.+\.gif)\)/) ? [null, null]
    github = { deprecated, image }
    script.github = github
  .then ->
    timeout(500)

module.exports = (scripts) ->
  scripts.reduce((promise, script) ->
    promise.then -> fetch(script)
  , Promise.resolve())
  .then -> scripts

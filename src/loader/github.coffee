{Promise} = require 'es6-promise'
cheerio = require 'cheerio'
request = require '../util/request-b'
timeout = require '../util/timeout'

module.exports = (scripts) ->
  promiseAll = scripts.reduce (promise, script) ->
    promise
      .then ->
        request
          method: 'GET'
          url: script.repo
      .then (res) ->
        $ = cheerio.load res.body
        deprecated = $('.repository-description').text().match(/DEPRECATED/)?
        image = $('#readme article p a').filter ->
          $(@).attr('href').match(/githubusercontent\.com/)
        .length > 0
        github = { deprecated, image }
        script.github = github
      .then ->
        timeout(1000)
  , Promise.resolve()
  promiseAll.then -> scripts

{Promise} = require 'es6-promise'

module.exports = (ms) ->
  new Promise (resolve) ->
    setTimeout resolve, ms

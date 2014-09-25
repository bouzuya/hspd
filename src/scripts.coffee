{Promise} = require 'es6-promise'
fs = require 'fs'
bbn = require './loader/bbn'
githubLoader = require './loader/github'

CACHE_FILE = '.hspd.cache.json'

cacheFile = ->
  CACHE_FILE

load = ->
  data = fs.readFileSync(cacheFile(), encoding: 'utf-8')
  json = JSON.parse(data)
  Promise.resolve json

save = (data) ->
  json = JSON.stringify(data)
  fs.writeFileSync(cacheFile(), json, encoding: 'utf-8')
  data

cached = ->
  fs.existsSync(cacheFile())

module.exports = ({ github, force }) ->
  if (force ? false) or !cached()
    bbn().then((scripts) ->
      if github then githubLoader(scripts) else scripts
    ).then(save)
  else
    load()

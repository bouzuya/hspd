scripts = require './scripts'
table = require './formatter/table'

output = (scripts) ->
  console.log table(
    ['no', 'date', 'name', 'repo', 'deprecated', 'image'],
    scripts.map (script) ->
      [
        script.no
        script.date
        script.name
        script.repo
        script.github.deprecated
        script.github.image
      ]
  )

module.exports = ->
  scripts({}).then(output)

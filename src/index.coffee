scripts = require './scripts'
api = require './formatter/api'
table = require './formatter/table'

output = ({ github, formatter }) ->
  (scripts) ->
    console.log formatter(
      [
        'no',
        'date',
        'name',
        'repo'
      ].concat(if github then ['deprecated', 'image'] else []),
      scripts.map (script) ->
        [
          script.no
          script.date
          script.name
          script.repo
        ].concat(
          if github then [script.github.deprecated, script.github.image] else []
        )
    )

module.exports = (options) ->
  { github, force, format } = options ? {}
  scripts({ github, force })
    .then(output({
      github
      formatter: (if format is 'api' then api else table)
    }))
    .then (-> 0), (e) -> console.error(e)

scripts = require './scripts'
table = require './formatter/table'

output = ({ github }) ->
  (scripts) ->
    console.log table(
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
          if github then [script.github.deprecated script.github.image] else []
        )
    )

module.exports = (options) ->
  { github, force } = options ? {}
  scripts({ github, force })
    .then(output({ github }))
    .then (-> 0), (e) -> console.error(e)


module.exports = (columns, rows) ->
  map =
    no: 'number'
    date: 'date'
    name: 'name'
    repo: 'repository'
    deprecated: 'deprecated'
    image: 'image'

  JSON.stringify {
    scripts: rows.map (i) ->
      columns.reduce (obj, j, index) ->
        obj[map[j]] = i[index]
        obj
      , {}
  }

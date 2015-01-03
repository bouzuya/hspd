class Table
  constructor: (@columns, @rows) ->
    @widths = @columns.map (col, i) =>
      [@columns].concat(@rows).reduce (w, row) =>
        Math.max(w, @_str(row[i]).length)
      , 0

  toString: ->
    return unless @rows.length > 0
    @_header() + @_line() + @_body()

  _header: ->
    ' ' + @columns.map (col, i) =>
      @_rpad(col, @widths[i])
    .join(' | ') + ' \n'

  _line: ->
    '-' + @columns.map (col, i) =>
      @_rpad('', @widths[i], '-')
    .join('-|-') + '-\n'

  _body: ->
    @rows.map (row) =>
      ' ' + @columns
        .map (col, i) =>
          @_rpad(@_str(row[i]), @widths[i])
        .join ' | '
    .join ' \n'

  _str: (o) ->
    o?.toString() ? ''

  _rpad: (s, l, p = ' ') ->
    s + [0...(l - s.length)].map(-> p).join('')

module.exports = (columns, rows) ->
  new Table(columns, rows).toString()

module.exports.Table = Table

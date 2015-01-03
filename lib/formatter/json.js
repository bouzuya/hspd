module.exports = function(columns, rows) {
  var map;
  map = {
    no: 'number',
    date: 'date',
    name: 'name',
    repo: 'repository',
    deprecated: 'deprecated',
    image: 'image'
  };
  return JSON.stringify({
    scripts: rows.map(function(i) {
      return columns.reduce(function(obj, j, index) {
        obj[map[j]] = i[index];
        return obj;
      }, {});
    })
  });
};

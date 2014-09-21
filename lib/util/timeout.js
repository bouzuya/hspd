var Promise;

Promise = require('es6-promise').Promise;

module.exports = function(ms) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, ms);
  });
};

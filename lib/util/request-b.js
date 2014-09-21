var Promise, request;

Promise = require('es6-promise').Promise;

request = require('request');

module.exports = function(params) {
  return new Promise(function(resolve, reject) {
    return request(params, function(err, res) {
      if (err != null) {
        return reject(err);
      }
      return resolve(res);
    });
  });
};

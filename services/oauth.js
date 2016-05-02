var webClient = require('@slack/client').WebClient,
Team = require('../models/team'),
Promise = require('bluebird');

module.exports = {

  access : function(code, wClient) {
    if(!code) throw new ReferenceError('Please add the code');
    var w = wClient || new webClient(),
      self = this;
    return new Promise(function(resolve, reject) {
      w.oauth.access(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        code,
        {},
        function(err, response) {
          if (err) return reject(err);
          Team.save(response)
          .then(function(res) {
            resolve(res);
          }, reject);
        }
      );
    });
  }
};

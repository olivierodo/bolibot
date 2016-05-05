var webClient = require('@slack/client').WebClient,
Team = require('./models/team'),
bot = require('./bot'),
config = require('config'),
Promise = require('bluebird');

module.exports = {


  access : function(code, wClient) {
    if(!code) throw new ReferenceError('Please add the code');
    var w = wClient || new webClient(),
      self = this;
    return new Promise(function(resolve, reject) {
      w.oauth.access(
        process.env.CLIENT_ID || config.slack.client_id,
        process.env.CLIENT_SECRET || config.slack.client_secret,
        code,
        {},
        function(err, response) {
          if (err) return reject(err);
          Team.save(response)
          .then(function(res) {
            resolve(response);
          }, reject);
        }
      );
    });
  }
};

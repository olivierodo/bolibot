var Promise = require('bluebird'),
  config = require('config'),
  translate = require('./translate');

module.exports = {

  _verify : function(vToken) {
    var _v = process.env.VERIFICATION_TOKEN || config.slack.verification_token
    if (!_v) throw new ReferenceError('Please set the VERIFICATION_TOKEN');
    return _v === vToken;
  },

  translate : function(token, lang, msg) {
    if (!this._verify(token)) throw new ReferenceError('The token is invalid');
    if (!lang) throw new ReferenceError('I can\'t define what is the language...');
    if (!msg) throw new ReferenceError('I can\'t define what is the message...');

    return new Promise(function(resolve, reject) {
      translate.get({
        q : msg,
        target : lang
      }).then(function(response) {
        resolve({
          response_type : 'in_channel',
          attachments: [{
            text : response
          }]
        });
      }, function (err) {
        reject(err);
      });
    });
  }
};

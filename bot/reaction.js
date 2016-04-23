var Promise = require('bluebird');
var webClient = require('@slack/client').WebClient;

module.exports = function(options) {
  this.options = options;

  this.add = function(emoji, channel, messageId) {
    return this._action('add', emoji, channel, messageId);
  };

  this.remove = function(emoji, channel, messageId) {
    return this._action('remove', emoji, channel, messageId);
  };

  this._action = function(action, emoji, channel, messageId) {
    var w = new webClient(this.options.token, {logLevel: this.options.logLevel});
    var self = this;
    return new Promise(function(resolve, reject) {
      w.reactions[action](emoji, {
        timestamp : messageId,
        channel : channel
      }, function(err, response) {
      });
    });
  };

  return this;
};

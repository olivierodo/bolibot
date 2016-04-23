var Promise = require('bluebird');
var webClient = require('@slack/client').WebClient;

module.exports = function(options) {

  this.options = options;

  this.getMessage = function(messageId, channelId) {
    var self = this;
    var type = self.getType(channelId);;
    return new Promise(function(resolve, reject) {
      self.by(type, channelId, messageId).then(function(response){ resolve(response);});
    });
  };

  this.by = function(type, id, messageId) {
    var self = this;
    return new Promise(function(resolve, reject) {
      var w = new webClient(this.options.token, {logLevel: this.options.logLevel});
      w[type].history(id, { inclusive: 1, count: 1}, function(err, response) {
         if (err) reject(err);
         if (!response.messages || !response.messages.length) reject('Message Not found');
         console.log(arguments);
         resolve(response.messages[0].text);
      });
    });
  };

  this.getType = function(id) {
    var res = undefined;
    switch(id.substr(0,1)) {
      case 'G':
        res = 'groups';
        break;
      case 'D':
        res = 'im';
        break;
      case 'C':
        res = 'channels';
        break;
    }
    return res;
  };


  return this;
};

var Promise = require('bluebird');
var webClient = require('@slack/client').WebClient;

module.exports = function(options) {
  this.options = options;

  this.send = function(text, channel, lang, messageId) {
    var w = new webClient(this.options.token, {logLevel: this.options.logLevel});
    var self = this;
    return new Promise(function(resolve, reject) {
      text = ':flag-' + lang + ': ' + text;
      text += '\n msg link : ' + self.generateLink(messageId, channel);
      w.chat.postMessage(channel, text, {
        icon_emoji : ':flag-' + lang + ':',
        unfurl_links : false,
        as_user : true
      }, function(err, response) {
        resolve();
      });
    });
  };

  this.generateLink =  function(messageId, channel) {
    return 'https://cookinky.slack.com/archives/'+ channel +'/p' + messageId.replace('.','');
  };

  return this;
};

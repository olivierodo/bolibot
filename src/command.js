var Promise = require('bluebird'),
  translate = require('./translate');

module.exports = {


  translate : function(lang, msg) {
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

var client = require('./bot/client'),
Team = require('../models/team.js'),
Promise = require('bluebird');

module.exports = {

  list : [],
  
  start : function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      Team.get()
      .then(
        function(res) {
          Object.keys(res || {})
          .forEach(function(s){
            self.add(res[s]);
          });
          resolve();
        },
        reject
      );
    });
  },

  add : function(options) {
    if (!options || !options.bot || !options.bot.bot_access_token) return false;
    this.list.push(client(options));
  },

};

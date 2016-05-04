var config = require('config'),
  slack = require('@slack/client'),
  translate = require('../translate'),
  //languages = require('../translate/languages'),
  search = require('./search'),
  message = require('./message'),
  reactions = require('./reaction'),
  RtmClient = slack.RtmClient,
  RTM_EVENTS = slack.RTM_EVENTS,
  CLIENT_EVENTS = slack.CLIENT_EVENTS;

var bot = function(options) {

  this.options = options;
  this.teamName = options.team_name;
  this.rtm = undefined;

  this.start = function() {

    this.rtm = new RtmClient(this.options.bot.bot_access_token, {logLevel: this.options.logLevel});
    this.rtm.start();
    this.startListner();
  };

  this.startListner = function() {

    var self = this;


    rtm.on(CLIENT_EVENTS.RTM.UNABLE_TO_RTM_START, function (rtmStartData) {
        //console.log('connection error', rtmStartData);
        //console.log('auth', rtmStartData);
    });

    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function (rtmStartData) {
        //console.log('auth', rtmStartData);
    });


    rtm.on(RTM_EVENTS.MESSAGE, function (message) {
      //console.log('message',message);
    });

    //reactions
    rtm.on(RTM_EVENTS.REACTION_ADDED, function (reaction) {
      var emoji = reaction.reaction;
      var lang = emoji.match(/^flag-[a-z]{2}$/) && emoji.substr(-2, 2);
      if(!lang) return;
      lang = languages.get(lang);
      if(!lang) return; //ToDO send message that we don't know what it this flag
      reactions(self.options).add('hourglass_flowing_sand',reaction.item.channel, reaction.item.ts);
      self.rtm.sendTyping(reaction.item.channel);
      //console.log(lang);

      search(self.options).getMessage(reaction.item.ts, reaction.item.channel)
        .then(function(response) {
          translate({
            q : response,
            target : lang
          }).then(function(response) {
            message(self.options).send(
              response,
              reaction.item.channel,
              lang,
              reaction.item.ts
            ).then(function(response) {
              reactions(self.options).remove('hourglass_flowing_sand',reaction.item.channel, reaction.item.ts);
            }, function(err) {
              console.log(err);
            });
          });
        });
    });
  };


  this.start();
  return this;
};


module.exports = bot;

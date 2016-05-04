var Firebase = require("firebase"),
  config = require('config'),
  Promise = require('bluebird');

module.exports = {

  modelName : 'teams',

  ref : undefined,

  getRef : function() {
    this.ref = this.ref || new Firebase(process.env.FIREBASE_URL || config.firebase.url );
    return this.ref.child(this.modelName);
  },

  get : function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.getRef().on("value", function(snapshot) {
        resolve(snapshot.val());
      }, reject);
    });
  },

  save : function(data) {
    var self = this;
    return new Promise(function(resolve, reject) {
      self.getRef()
      .push()
      .set(data, function(err) {
        if (err) return reject(err);
        resolve();
      });
    });
  },
};

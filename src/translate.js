var google = require('googleapis'),
  Promise = require("bluebird"),
  Entities = require('html-entities').AllHtmlEntities;
  config = require('config');

module.exports = {

  data : require('config').languages,

  getLanguage : function(flag) {
    var res = false;
    for(var s in this.data) {
      if (s === flag || -1 !== this.data[s].indexOf(flag)) {
        res = s;
        break;
      }
    }
    return res;
  },


  get : function(options) {

    if (!options) throw new ReferenceError('The function needs options');
    if (!options.q) throw new ReferenceError('Please add the query on the options');
    if (!options.target) throw new ReferenceError('Please add the target on the options');

    var l  = this.getLanguage(options.target);
    if(!l) throw new ReferenceError('The \''+ options.target+'\' language is not available');

    options.target = l;

    options.key = options.key || process.env.G_TRANSLATE_KEY || config.google.key;


    return new Promise(function(resolve, reject) {
      var translations = google.translate('v2').translations;
      var g = options.google || translations;
      g.list(options, function(err, response) {
        if (err) return reject(err);
        if (!response || !response.data) return reject('An error occurred. Please try again later');
        var result = response.data.translations;
        resolve(result[0].translatedText);
      });
    });
  },

  _decode : function(str) {
    return (new Entities()).decode(str);
  }
};

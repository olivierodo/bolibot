
module.exports = {

  oauth : function(req, res) {
    try {
      var code  = req.query.code;
      var state = req.query.state;
      require('./oauth').access(code)
      .then(function(response) {
        require('./bot').add(response);
        res.send(response);
      }, function(error) {
        res.send(error);
      });
    } catch(err) {
      res.send(err.message);
    };
  },

  command : function(req, res) {
    try {
      require('./command').translate(req.params.lang, req.body.text)
      .then(function(response) {
        res.send(response);
      }, function(err) {
        res.send({text : err.message });
      });
    } catch(err) {
      res.send({text : err.message});
    }
  }
};

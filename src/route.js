
module.exports = {

  home : function(req,res) {
    // HELPER TO DELETE
    if(req && req.param &&  req.param('q')=='signup') {
      var data = {
          "ok": req.param('e') ? false : true,
          "team_name": "MyTeam",
          "error" : "Just an error example"
      };
      return res.render('signUp', data);
    }
    // END HELPER TO DELETE
    return res.render('index');
  },

  oauth : function(req, res) {
    try {
      var code  = req.query.code;
      var state = req.query.state;
      require('./oauth').access(code)
      .then(function(response) {
        require('./bot').add(response);
        res.render('signUp', response);
      }, function(error) {
        res.render('signUp', {ok:false, error: error});
      });
    } catch(err) {
      res.render('signUp', {ok:false, error:err.message});
    };
  },

  command : function(req, res) {
    try {
      require('./command').translate(req.body.token, req.params.lang, req.body.text)
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

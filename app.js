//app.js

var
  app = require('express')(),
  config = require('config'),
  bot = require('./services/bot'),
  oauth = require('./services/oauth'),
  command = require('./services/command'),
  bodyParser = require('body-parser');
  app.use( bodyParser.json() );
  app.use(bodyParser.urlencoded({extended: true})); 

/*
var slackOptions = {
  token : process.env.SLACK_TOKEN || config.slack.api_token,
  logLevel: 'info'
};
*/

app.get('/', function (req, res) {
  res.send('hello world');
});

// GET /OAUTH
app.get('/oauth', function (req, res) {
  try {
    var code  = req.query.code;
    var state = req.query.state;
    oauth.access(code)
    .then(function(response) {
      res.send(response);
    }, function(error) {
      res.send(error);
    });
  } catch(err) {
    res.send(err.message);
  };
});

// POST /{:lang} (/en, /fr
app.post('/:lang', function (req, res) {
  try {
    command.translate(req.params.lang, req.body.text)
    .then(function(response) {
      res.send(response);
    }, function(err) {
      res.send({text : err.message });
    });
  } catch(err) {
    console.log(err);
    res.send({text : err.message});
  }
});


//START APP
var port = process.env.PORT || 5000;
app.listen(port, process.env.OPENSHIFT_NODEJS_IP, function () {
    console.log('Example app listening on port '+ port+ '!');
});

//app.js

var
  express = require('express'),
  app = express(),
  config = require('config'),
  bot = require('./src/bot'),
  oauth = require('./src/oauth'),
  command = require('./src/command'),
  bodyParser = require('body-parser');

// CONFIG
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// GET /
app.get('/', function (req, res) {
  res.render('index', {foo: 'BAR'});
});

// GET /OAUTH
app.get('/oauth', function (req, res) {
  try {
    var code  = req.query.code;
    var state = req.query.state;
    oauth.access(code)
    .then(function(response) {
      bot.add(response);
      res.send(response);
    }, function(error) {
      res.send(error);
    });
  } catch(err) {
    res.send(err.message);
  };
});

// POST /{:lang} (/en, /fr)
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
    console.log('Starting app on port '+ port+ '!');
    //bot.start(); // start bot
});

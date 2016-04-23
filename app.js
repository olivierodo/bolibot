//app.js

var 
  bot = require('./bot'),
  app = require('express')(),
  config = require('config'),
  translate = require('./translate'),
  bodyParser = require('body-parser');
  app.use( bodyParser.json() );
  app.use(bodyParser.urlencoded({extended: true})); 



app.get('/', function (req, res) {
  res.send('hello world');
});

app.post('/:lang', function (req, res) {
  translate({
    q : req.body.text,
    target : req.params.lang
  }).then(function(response) {
    return res.send({
      "response_type": "in_channel",
       "attachments": [
        {
          "text": response,
        }
      ]
    });
  }, function(err) {
    return res.send(err);
  });
});

var port = process.env.PORT || 5000;
app.listen(port, process.env.OPENSHIFT_NODEJS_IP, function () {
    console.log('Example app listening on port '+ port+ '!');
    bot({
      token : config.slack.api_token,
      logLevel: 'info'
    });
});





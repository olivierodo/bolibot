//app.js

var 
  bot = require('./bot'),
  search = require('./bot/search'),
  app = require('express')(),
  config = require('config'),
  translate = require('./translate'),
  bodyParser = require('body-parser');
  app.use( bodyParser.json() );
  app.use(bodyParser.urlencoded({extended: true})); 

var slackOptions = {
  token : config.slack.api_token,
  logLevel: 'info'
};

app.get('/', function (req, res) {
  res.send('hello world');
});

app.post('/:lang', function (req, res) {
  console.log(req.body);
  function action(text) {
    translate({
      q : text,
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
  }

  var text = req.body.text;
  if (text) {
    return action(text);
  } else {
    search(slackOptions).getMessage(undefined, req.body.channel_id).then(action);
  }
});

var port = process.env.PORT || 5000;
app.listen(port, process.env.OPENSHIFT_NODEJS_IP, function () {
    console.log('Example app listening on port '+ port+ '!');
    bot(slackOptions);
});





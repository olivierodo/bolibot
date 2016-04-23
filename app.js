//app.js

var 
  app = require('express')(),
  config = require('config'),
  bodyParser = require('body-parser'),
  google = require('googleapis'),
  translate = google.translate('v2');
  app.use( bodyParser.json() );
  app.use(bodyParser.urlencoded({extended: true})); 



app.get('/', function (req, res) {
  res.send('hello world');
});

app.post('/:lang', function (req, res) {
  var options = {
    key : config.google.key,
    q : req.body.text,
    target : req.params.lang
  };

  if (!options.key) return res.send('need google key');
  if (!options.q) return res.send('need query');
  if (!options.target) return res.send('need target');

  translate.translations.list(options, function(err, response) {
    var result = response.data.translations;
    return res.send({
      "attachments": [
        {
          "title": '@' + (req.body.user_name || 'Someone') + ' says : ',
          "pretext": options.q,
          "text": response.data.translations[0].translatedText,
        }
      ]
    });
  });
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, process.env.OPENSHIFT_NODEJS_IP, function () {
    console.log('Example app listening on port '+ port+ '!');
});



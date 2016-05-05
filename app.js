var
  express = require('express'),
  app = express(),
  route = require('./src/route'),
  bodyParser = require('body-parser');

// CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');

// GET /
app.get('/', route.home);

// GET /OAUTH
app.get('/oauth', route.oauth);

// POST /{:lang} (/en, /fr)
app.post('/:lang', route.command);

//START APP
var port = process.env.PORT || 5000;
app.listen(port, process.env.OPENSHIFT_NODEJS_IP, function () {
    console.log('Starting app on port '+ port+ '!');
    //require('./src/bot').start(); //start bot
});

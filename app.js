//app.js

var 
  app = require('express')(),
  bodyParser = require('body-parser')
  app.use( bodyParser.json() );
  app.use(bodyParser.urlencoded({extended: true})); 

app.get('/', function (req, res) {
  res.send('hello world');
});


app.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP, function () {
    console.log('Example app listening on port 3000!');
});



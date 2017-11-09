
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var port = process.env.PORT || 3500;
var router = require('./routes');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.listen(port);
console.log('Magic happens on port ' + port);

app.use('/api', router);


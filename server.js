const PORT      = 3000;
var express     = require('express');
var app         = express();
var body_parser = require('body-parser'); 
var authRoute   = require('./userAuthController.js');

//configuration of application
var config = require('./config.js');
var db     = require('./db.js');

// Middlewares to parse the body
app.use(body_parser.json()); // If body is in json form 
app.use(body_parser.urlencoded({extended:true})); // If body is in urlencoded form 

app.use('/api',authRoute);

app.listen( PORT, function(){
	console.log('Listening on port '+PORT);
});



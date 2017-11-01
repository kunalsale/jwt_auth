var express = require('express');
var bcrypt  = require('bcryptjs');
var User    = require('./user.js');
var config  = require('./config.js');
var jwt     = require('jsonwebtoken');
var router  = express.Router();

// it is given above middleware because to bypass the code in middleware
router.post('/authMe',function(req,res){
	var accessToken = req.headers['x-access-token'];
	if(!accessToken)
	{
		res.status(401).send({ auth: false, message: 'No token provided.' });
	}
	jwt.verify(accessToken,config.secret,function(err,decoded)
	{
		if (err)  res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
		res.status(200).send({"success":true})
	});
});

// middleware to check whether number and password is present or not
router.use(function(req,res,next){
	if(!req.body.password || !req.body.number)
	{
		res.send({"success":false,"error":"Some parameters are missing"});
	}
	next();
});

// For signIn
router.post('/signIn',function(req,res){
	var userName = req.body.name;
	var password = req.body.password;
	var number   = req.body.number;
	
	var saveUser      = new User();
	saveUser.name     = userName;
	saveUser.password = bcrypt.hashSync(password);
	saveUser.number   = number;

	checkUserExistOrNot(number,function(err,doesUserExist)
	{
		if(doesUserExist)
		{
			res.send({"success":false,"error":"User already exists"});
		}
		else
		{
			saveUser.save(function(err,user)
			{
				if(err)		return err;	
				// create a token
    				var token = jwt.sign({ id: user._id }, config.secret, {
      				expiresIn: 86400 // expires in 24 hours
    				});
				var response = {};
				response.data = user;
				response.token   = getToken(user);
				res.send(response);
			});
		}
	});	
});

// For signUp
router.post('/signUp',function(req,res){
	var password = req.body.password;
	var number   = req.body.number;
	
	checkUserExistOrNot(number,function(err,doesUserExist)
	{
		if(!doesUserExist)
		{
			res.send({"success":false,"error":"User doesn't exists"});
		}
		else
		{
			var response = {};
			response.data = doesUserExist;
			response.token   = getToken(doesUserExist);
			res.send(response);
		}
	});
});

function getToken(user)
{
	var token = jwt.sign({ id: user._id }, config.secret, {
      				expiresIn: 86400 // expires in 24 hours
    				});
	return token;
}

//check whether 
function checkUserExistOrNot(number,callback)
{
	User.findOne({number:number},function(err,userExists)
	{
		if(err)
		{
			callback(err,null);
		}
		callback(null,userExists);
	});
}

module.exports = router;

# LoginApis
#JWT(Json Web Token)

JWT helps to authenticate user using token. After successful login, it generates token and then pass the token to client.
Client stores the token and uses it in every response later. 

JWT uses payload which is an object containing unique parameter and also one secret key which can be any string.

Components used in projects:

1.Express js: Express js is used for routing
2.Mongoose: Used to do operations in mongoDB
3.jsonwebtoken: To generate token based on secret key

Generating Token is given below:
var payload = { id: user._id };
var token = jwt.sign(payload, "anything of your convinience", {expiresIn: time in seconds});

Verifying Token in later apis:

jwt.verify(accessToken,"same as generating",function(err,decoded)
	{
		//callback on success
	});
  
  accessToken: Passed by client 
  

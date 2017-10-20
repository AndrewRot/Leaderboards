// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');


// **** CODE FOR SETTING UP MONGO ***********************
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/accounts';


var monk = require('monk');
//var db = monk('localhost:27017/data');

//var routes = require('./routes/index');
//var users = require('./routes/users');
var qs = require('querystring');

//var router = express.Router();


//[From other project] We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var db;
MongoClient.connect(url, function (err, db1) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
    db = db1;
}});
//*******************************************************





const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));



// **** CODE FOR SETTING UP MONGO ***********************
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

// routes will go here
//tell express what to do when the /about route is requested
app.post('/userlist', function(req, res){
  var body = ''
  //console.log("Handling Search");
  req.on('data', function(d) {
    body += d;
  })
    req.on('end', function(d) {
      var post = qs.parse( body )

      console.log("post body: "+ post);


  })
});


//*******************************************************


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {

	// **** CODE FOR SETTING UP MONGO ***********************
	//This section will and should be moved else where.. just here now for setting up Mongo DB
	var collection = db.collection('accounts');
  
    //In order to query a mongo db, we need to create a Promise 
   	var p1 = new Promise(function(resolve, reject) {

	    var count = db.collection('accounts').find({first: "Andrew"}).count(); 
	    resolve(count); //resolving this adds count to our variable p1
	});
	p1.then(function(count) {
	    console.log("Number of people with first name Andrew: "+ count);
	    //res.end(JSON.stringify(value)   );
	    //send back data
	    //res.end("end");

	 }, function(reason) {
	    console.log("fail: "+reason); // Error!
	 });
	//*******************************************************


   	//This handles every page request. Directs the user to index.html, everything is rendered from there
  	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
// server/app.js
const express = require('express');
var router = express.Router();
var http = require('http');         // protocol 
var url = require('url')
const morgan = require('morgan');
const path = require('path');
const app = express();
var qs = require('querystring');
//const mongoHelpers = require('./mongoHelpers');
var async = require('async');


// **** CODE FOR SETTING UP MONGO ***********************
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongodb = require('mongodb');
var url = 'mongodb://localhost:27017/accounts';
var monk = require('monk');
var qs = require('querystring');


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




// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));



// **** CODE FOR SETTING UP MONGO ***********************
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies





/* Handle post requests from the client */
app.post('/signup',(req,res) =>{
  //grab the elements sent from the user
  let userid= 1; //We are going to have to eventually make this unique and globally incremental, but 5 is fine for now
  var first=req.body.first;
  var last=req.body.last;
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  var city=req.body.city;
  var zip=req.body.zip;
  var state=req.body.state;
  var country=req.body.country;

  var accounts = db.collection('accounts');
  //generate new userID to use ***** move this to a mongohelper file
  var p = new Promise(  function(resolve, reject) {
    //get the number of users in the db, but dont move on until this uqery is done!
    accounts.count({}, function (error, count) {
      //increment the count by 1 each time
      let nextUserID = count+1;
      resolve(nextUserID);
      console.log("error: "+error + " nextUserID: "+nextUserID);
    });
  });
  p.then(function(response) { // success
    
    accounts.save( { userid: response, first: first, last: last, username: username, email:email, password:password, city:city, zip:zip, state:state, country:country}); //alternatively use insert instead of save for none persistance
    //console.log("NEW USER: userid = "+response+", first "+first+", last "+last+", username "+username+", email "+email+", password "+password +", city "+city +", zip "+zip +", state "+state +", country "+country);
    res.status(200).send('Good');
  }, function(reason) {
    console.log("failed to generate new unique userID: "+reason); // Error!
    res.status(400).send('Error');
  });
  res.end("yes");
});






/* Handle get requests from the client */
app.get('/login',(req,res) =>{
  console.log("URL: "+ req.url );

  //parse our url to get the fields we want
  //Starting URL: /login?username=gablergab&email=dude%40wpi.edu
  var uri = req.url.replace("/login?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
  var uri = uri.replace(/email=/i, ''); //strip out the email and password name fields
  var uri = uri.replace(/password=/i, ''); //strip out the email and password name fields
  //gablergab&dude%40wpi.edu
  var uri = uri.split('&'); //now we have an array of the email and password
  //Desired, variables holding individual strings
  var email=uri[0].replace(/%40/i, '@'); //conver this back to %40
  var password=uri[1];

  console.log("email = "+email+", password = "+password);
  //hold on to the fields returned by the query
  var userinfo = [{}];

  //now run our query on the database with the username and password
  var p1 = new Promise(function(resolve, reject) {
    //run query
    db.collection('accounts').findOne({ $and: [{email:  email}, {password: password }]}, function(err, document) {
        //console.log(document.username + " has logged in");
        resolve(document);
      });
    });

  p1.then(function(value) {    
    console.log("Data found JSON stringify: "+JSON.stringify(value)); // Success!
    //console.log("Data found untouched: "+value); // Success!
    res.end(JSON.stringify(value));
    }, function(reason) {
      console.log("fail: "+reason); // Error!
      //fill in res.end with error
    });
  //res.end("yes");
});



//When we load the leaderboard page!
app.get('/leaderboard',(req,res) =>{
  console.log("URL: "+ req.url );

  //parse our url to get the fields we want
  //Starting URL: /leaderboard?company=testboard&stat=score
  var uri = req.url.replace("/leaderboard?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
  var uri = uri.replace(/company=/i, ''); //strip out the email and password name fields
  var uri = uri.replace(/stat=/i, ''); //strip out the email and password name fields
  //gablergab&dude%40wpi.edu
  var uri = uri.split('&');


  //Desired, variables holding individual strings
  var company=uri[0];
  var statType=uri[1];

  console.log("company = "+company + " stat type = "+statType);
  //hold on to the fields returned by the query
  var collection = db.collection(company);

  //now run our query on the database with the username and password
  var p1 = new Promise(function(resolve, reject) {
    
    //**** Later on we will want to insert in an order so we dont have to sort now - this will take a long time if there is a lot of data. if the collection is already sorted, it will only take o(1) to grab the first 10 elements
    //run query
    /*let document = collection.find()
                              .sort({ "score": -1}) //sort by score in descending order
                              .limit(3).toArray();  //convert to array then to json so we can handle it
    */

    //To allow dynamic sorting in mongo
    var sortObject = {};
    var stype = statType;//req.params.sorttype;
    var sdir = -1;//req.params.sortdirection;
    sortObject[stype] = sdir; //now pass sort object as an argument to where we search below
    //test.find().sort(sortObject)

    //join specificed table with accounts table
    let document = collection.aggregate([
    { $lookup: //essentially a join
       {
         from: 'accounts', //from what table
         localField: 'userid', //bind on this local field
         foreignField: 'userid', //bind on this foreign field from from
         as: 'userinfo' //insert into an array named this
       }
     }, 
     {'$sort' : sortObject}  //eventually make ascending/descending a filter as well (-1, 1)
    ]).limit(15).toArray(); //***eventually make limit value a filter



    resolve(document); //pass the arrray to our resolve statement

    
  });

  p1.then(function(value) {   
    //console.log("Data found JSON stringify: "+JSON.stringify(value)); // Success!
    res.end(JSON.stringify(value));
    }, function(reason) {
      console.log("fail: "+reason); // Error!
      //fill in res.end with error
    });
  //res.end("yes");
});





//*******************************************************


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  console.log("req.path: "+ req.path +   " ... req.url: "+ req);

	// **** CODE FOR SETTING UP MONGO *********************** WOrking - now we dont really need this
	//This section will and should be moved else where.. just here now for setting up Mongo DB
	var collection = db.collection('accounts');
  
    //In order to query a mongo db, we need to create a Promise 
   	var p1 = new Promise(function(resolve, reject) {

	    var count = db.collection('accounts').find({first: "Andrew"}); 

      count.each(function(err, item) {
        if(item != null){
          //console.log(item.username + ", First: " + item.first + ", Last: " + item.last);
        }
        
      });

	    resolve(count); //resolving this adds count to our variable p1
	});
	p1.then(function(count) {


	    //console.log("Andrew: "+ count);
      //console.log("Andrew: "+ JSON.stringify(count));
	    //res.end(JSON.stringify(value)   );
	    //send back data
	    //res.end("end");
      //res.send({count})

	 }, function(reason) {
	    console.log("fail: "+reason); // Error!
	 });
	//*******************************************************


   	//This handles every page request. Directs the user to index.html, everything is rendered from there
  	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
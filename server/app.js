// server/app.js
const express = require('express');
var router = express.Router();
var http = require('http');         // protocol 
var url = require('url')
const morgan = require('morgan');
const path = require('path');
const app = express();
var qs = require('querystring');
var tools = require("./sqlHelpers.js");


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


//******* MY SQL ************************************************
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'leaderboards'
 });

connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

//WORKING!
/*connection.query('SELECT * FROM accounts', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0])
})
*/

//***************


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
  let userid= 4; //We are going to have to eventually make this unique and globally incremental, but 5 is fine for now
  var first=req.body.first;
  var last=req.body.last;
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  var city=req.body.city;
  var zip=req.body.zip;
  var state=req.body.state;
  var country=req.body.country;
  var token= '123';

  //Converting to mySQL
  //Create Query string to pass
  //insert into Accounts values(1, 'Andrew', 'Rottier', 'acrottier', 'andrewrottier95@gmail.com', 'password', 'Worcester', 'MA', 'United States', '123');
  // will want to convert this into a method somehow
  var query = "insert into Accounts values(" +userid+",'"+first+"','"+last+"','"+username+"','"+email+"','"+password+"','"+city+"','"+state+"','"+country+"','"+token+"');";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err

    console.log('Inserted: ', rows)
  })
  res.status(200).send('Good');
});


//Post an update. The user as followed a board! probably name the table something, push name of board
app.post('/followboard',(req,res) =>{
  let userid=parseInt(req.body.userid);  //user to add board to and convert it to an integer
  let boardToFollow=req.body.board; //this should be the string of the board we wanna push to accounts.boards array
  console.log("userid: "+userid+" Board to follow: "+boardToFollow);
  //insert into BoardAccountLink values(1, 1);
  var query = "insert into BoardAccountLink values(" +userid+","+boardToFollow+");";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err

    console.log('Inserted: ', rows)
  })
  res.status(200).send('Good');
});





/* Handle get login requests from the client */
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
  
  var query = "Select * from Accounts where email = '"+ email + "' and password = '"+password+"'";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err

    console.log('User Info: ', JSON.stringify(rows));
    res.status(200).end(JSON.stringify(rows)); //first argument must be a string or buffer
  })
});

//Verify that a facebook token is valid
app.get('/verify',(req,res) =>{
  console.log("URL: "+ req.url );
  //parse our url to get the fields we want
  //Starting URL: /verify?token=123siodfn9u23nr1&userid=12345321
  var uri = req.url.replace("/verify?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
  var uri = uri.replace(/token=/i, ''); //strip out the email and password name fields
  var uri = uri.replace(/userid=/i, ''); //strip out the email and password name fields
  //gablergab&dude%40wpi.edu
  var uri = uri.split('&'); //now we have an array of the email and password
  //Desired, variables holding individual strings
  var token=uri[0]; //this is the access token
  var userid=uri[1];

  console.log("Access Token = "+token+", userID = "+userid);
  
  //How do we know what to store, who to store it with?

  res.end("Verified end");
});



//fetchboards from the database for the browse page
app.get('/fetchboards',(req,res) =>{
   var query = "Select * from Boards limit 9";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    console.log('Fetched boards: ', JSON.stringify(rows));
    res.status(200).end(JSON.stringify(rows)); //first argument must be a string or buffer
  })
});

//getmy board info getmyboardinfo
app.get('/getmyboardinfo',(req,res) =>{
  console.log("/URL: "+ req.url );
  var uri = req.url.replace("/getmyboardinfo?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
  var uri = uri.replace(/userid=/i, ''); //strip out the email and password name fields
  //gablergab&dude%40wpi.edu
  //Desired, variables holding individual strings
  var userid=uri; 

   var query = "Select * from BoardAccountLink BAL, Boards B where userID ="+userid + " and B.boardID = BAL.boardID";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    console.log('Fetched boards: ', JSON.stringify(rows));
    res.status(200).end(JSON.stringify(rows)); //first argument must be a string or buffer
  })
});




app.get('/getBoardStats',(req,res) =>{
  console.log("URL: "+ req.url );
  //parse our url to get the fields we want
  //Starting URL: /getBoardStats?boardID=1
  var uri = req.url.replace("/getBoardStats?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
  var uri = uri.replace(/boardID=/i, ''); //strip out

  //Desired, variables holding individual strings
  var boardID=uri;
  console.log("boardID = "+boardID);

  var query = "Select * from Scores S where S.boardID = "+boardID + " GROUP BY S.scoreID";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    console.log('Fetched board statTypes: ', JSON.stringify(rows));
    res.status(200).end(JSON.stringify(rows)); //first argument must be a string or buffer
  })
});


//When we load the leaderboard page based on filters from the filter section!
app.get('/leaderboard',(req,res) =>{
  console.log("URL: "+ req.url );
  var uri = req.url.replace("/leaderboard?", '').replace(/%20/i, ' ');//replace space char with a space; //strip out the path  //username=gablergab&email=dude%40wpi.edu
  var uri = uri.replace(/boardID=/i, ''); //strip out
  var uri = uri.replace(/scoreID=/i, ''); //strip out
  var uri = uri.replace(/statTime=/i, ''); //strip out
  var uri = uri.replace(/statLocation=/i, ''); //strip out
  var uri = uri.replace(/userID=/i, ''); //strip out
  var uri = uri.replace(/city=/i, ''); //strip out
  var uri = uri.replace(/state=/i, ''); //strip out
  var uri = uri.replace(/country=/i, ''); //strip out

  //***** add user id to this maybe here
  var uri = uri.split('&');

  //Desired, variables holding individual strings
  var boardID=uri[0];
  var scoreID=uri[1];
  var statTime=uri[2];
  var statLocation=uri[3];
  var userID=uri[4];
  var city=uri[5];
  var state=uri[6];
  var country=uri[7];
  //Generate locational segment of the query
  var locationalQuery = " ";//be default lets load this data globally (that means no content here)
  switch(statLocation) {
    case "City":
      locationalQuery = " and A."+statLocation+" = '"+ city+"' ";
      break;
    case "State":
      locationalQuery = " and A."+statLocation+" = '"+ state+"' ";
      break;
    case "Country":
      locationalQuery = " and A."+statLocation+" = '"+ country+"' ";
      break;
  }

  //Should do the same thing with time
  var timeQuery = " ";//be default lets load this data all-time (that means no content here)
  switch(statTime) {
    case "Daily":
    //post_modified > DATE_SUB(CURDATE(), INTERVAL 4 WEEK);
      timeQuery = " and S.time >  DATE_SUB(CURDATE(), INTERVAL 1 DAY) ";
      break;
    case "Weekly":
      timeQuery =" and S.time >  DATE_SUB(CURDATE(), INTERVAL 1 WEEK) ";
      break;
    case "Monthly":
      timeQuery = " and S.time >  DATE_SUB(CURDATE(), INTERVAL 4 WEEK) ";
      break;
  }


  //console.log("boardID: "+boardID+ " scoreID: "+scoreID+ " statType: "+statType+" statTime: "+statTime+" statLocation: "+statLocation+" userID: "+userID + " city: "+city+" state: "+state+" country: "+country);

  //This is going to have to be updated to use more filters, probably a few consecutive queries or lots of joins
  //Select all the scores from the given board's selected statType/scoreID. 
  var query = "Select firstName, lastName, username, score, city, state, country, time  "+
               "from Scores S, Accounts A "+
               " where S.scoreID = "+scoreID+
                locationalQuery + //select the type of locational based info
                timeQuery + //select the type of time based info
               " and S.boardID = "+ boardID+ 
               " and S.userID = A.userID "+ 
               " ORDER BY score DESC";

  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    //console.log('Leaderboard data fetched: ', JSON.stringify(rows));
    res.status(200).end(JSON.stringify(rows)); //first argument must be a string or buffer
  })

});





//*******************************************************


// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  //console.log("req.path: "+ req.path +   " ... req.url: "+ req);


   	//This handles every page request. Directs the user to index.html, everything is rendered from there
  	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
// server/app.js
const express = require('express');
var router = express.Router();
var http = require('https');  // protocol
var url = require('url')
const morgan = require('morgan');
const path = require('path');
const app = express();
var qs = require('querystring');

var database = require("./DatabaseUtility.js");
var APIRouter = require("./APIRouter.js");
var utils = require("./Utilities.js");
var SQL = require("./sqlHelpers.js");




// *************************************************************
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var qs = require('querystring');
let connection;


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies



//Middleware function before every server call. Every time a page is loaded - perform these tasks
// 1.) connect to the database
// Concern - when is a good time to kill the connection? (they can perform multple queries from one page) conncetion.end()
app.all('*', (req, res, next) => {
    connection = database.connectToDatabase();
    next();
});


/* Handle signing up from the client */
//MAKE SURE COOKIE is holding the token!!
app.post('/signup',(req,res) =>{
  var first=req.body.first;
  var last=req.body.last;
  var username=req.body.username;
  var email=req.body.email;
  var password=req.body.password;
  var city=req.body.city;
  var zip=req.body.zip;
  var state=req.body.state;
  var country=req.body.country;
  var token= utils.generateToken();

  //Get the next available userID
  var p1 = SQL.getNextUserID(connection);
  p1.then(function(newID) { // Found the next available ID!
    var query = "insert into Accounts values(" +newID+",'"+first+"','"+last+"','"+username+"','"+email+"','"+password+"','"+city+"','"+state+"','"+country+"','"+token+"');";
    console.log("QUERY:" +query);
    connection.query(query, function (err, rows, fields) {
      if (err) throw err
      console.log('Created Account: ', rows)
    })
  }, function(reason) {
    console.log("Failed to create account: "+reason); // Error!
  });

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
//***TO DO - generate new token and assign here as well - return it to user and update his local cookie
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

  //attempt to login, if success, then assign new token
  var p1 = SQL.login(connection, email, password);
  p1.then(function(data) { // User succesfully logged in! 
    //console.log('User Info: ', JSON.stringify(data));
    res.status(200).end(JSON.stringify(data)); 
  }, function(reason) {
    console.log("Failed to login: "+reason); // Error!
  });
});



//fetchboards from the database for the browse page
app.get('/fetchboards',(req,res) =>{
   var query = "Select * from Boards limit 9";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    //console.log('Fetched boards: ', JSON.stringify(rows));
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
    //console.log('Fetched boards: ', JSON.stringify(rows));
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
  //console.log("boardID = "+boardID);

  var query = "Select DISTINCT scoreName from Scores S where S.boardID = "+boardID + "  ";
  console.log("QUERY: " +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err
    //console.log('Fetched board statTypes: ', JSON.stringify(rows));
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



//Connect to the respective board's API, pass along the boardID, login credentials, and database connection
app.get('/connectto/*',(req,res) =>{
  console.log("API URL: "+ req.url );
  //parse our url to get the fields we want
  //Starting URL: /connectto/3?username=andrewrot&password=1one124
  var uri = req.url.replace("/connectto/", ''); //strip out the path  
  var uri = uri.replace(/userID=/i, ''); //strip out the email and password name fields
  var uri = uri.replace(/email=/i, ''); //strip out the email and password name fields
  var uri = uri.replace(/password=/i, ''); //strip out the email and password name fields

  var uriSplit = uri.split('?');//break into [#, username=XXX&password=XXX]
  var boardID = uriSplit[0]; //first element is the boardID

  var uri = uriSplit[1].split('&'); //now we have an array of the email and password
  //Desired, variables holding individual strings
  var userID=uri[0];
  var email=uri[1].replace(/%40/i, '@'); //conver this back to @ from %40
  var password=uri[2];

  console.log("boardID = "+boardID+ " userID = "+userID+ ", email = "+email+", password = ***");
  
  //Attempt to login to the application. If successful, return the data in object form* OLD
  //Connect to API, then send data to database directly. Pass the connection as well
  var p1 = APIRouter.connectToAPI(boardID, email, password);
  p1.then(function(APIData) {
    console.log("--------------: "+ APIData);
    database.insertData(boardID, userID, APIData, connection);
    //send back data
    //res.end("end");
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });


  //Return a successful connection;
  res.status(200).send('Good');
});

//Connect to an API that has their own custom login
app.get('/ConnectToCustomAPI/*',(req,res) =>{
  console.log("API URL: "+ req.url );
  //parse our url to get the fields we want
  //Starting URL: /connectto/3?
  var uri = req.url.replace("/ConnectToCustomAPI/", ''); //strip out the path  
  var boardID = uri[0]; //first element is the boardID
  console.log("boardID = "+boardID);
  
  //Attempt to login to the application. If successful, return the data in object form* OLD
  //Connect to API, then send data to database directly. Pass the connection as well
  var p1 = APIRouter.connectToAPI(boardID, '', ''); //email and password blank
  p1.then(function(APIData) {
    console.log("--------------: "+ APIData); //This should be html login page
    res.status(200).end(APIData);
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  });

  //Return a successful connection;
  //res.status(200).send('Good');
});
//^This will have to have another handler that receives the data returned by an authentic response form insta or whatever 3rd party app



//*******************************************************
// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  //console.log("req.path: "+ req.path +   " ... req.url: "+ req);
 	//This handles every page request. Directs the user to index.html, everything is rendered from there
	res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
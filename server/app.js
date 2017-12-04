// server/app.js
const express = require('express');
var router = express.Router();
var http = require('https');  // protocol
var url = require('url');
const { URL, URLSearchParams } = require('url');

const morgan = require('morgan');
const path = require('path');
const app = express();
var qs = require('querystring');

var database = require("./DatabaseUtility.js");
var APIRouter = require("./APIRouter.js");
var utils = require("./Utilities.js");
var SQL = require("./sqlHelpers.js");
var APIs = require("./APIs.js");


// *************************************************************
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
let connection;


// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies



/** Middleware function before every server call. Every time a page is loaded - perform these tasks
 * 1.) connect to the database
 * 2.) [NOT YET IMPLEMENTED] Always check the user's token against the database. If it matches, we are goo to continue.
 *     Otherwise, we should not continue - reroute the user to the signin page
 * Concern - when is a good time to kill the connection? (they can perform multple queries from one page) conncetion.end()
*/
 app.all('*', (req, res, next) => {
    connection = database.connectToDatabase();

    /* PSEUDO code to fill in later
      var p1 = SQL.confirmProperToken(connection, token);
      p1.then(function(data) { // proper token - continie
        console.log("All set!");
        res.status(200).send(JSON.stringify(data));
      }, function(reason) { // no token found indatabase - send them to signin screen
        res.status(200).send(JSON.stringify("please sign in"));  //update this to be the signing url
      });
     */

    next();
});


/** Handle signing up from the client
 * 1: get all of the parameters from the sign in page
 * 2: generate the next available user ID
 * 3: Now insert the data to our accounts database table
 * 4: Signin with the user's credentials and return the info to the client
 */
app.post('/signup',(req,res) =>{
  let first=req.body.first;
  let last=req.body.last;
  let username=req.body.username;
  let email=req.body.email;
  let password=req.body.password;
  let city=req.body.city;
  let zip=req.body.zip;
  let state=req.body.state;
  let country=req.body.country;
  let token= utils.generateToken(); //This might be better in a promise, even though it's just a function to generate a random string.

  //Get the next available userID
  var p1 = SQL.getNextUserID(connection);
  p1.then(function(newID) { // Found the next available ID!
    console.log("New Id found:" +newID);
    return SQL.signUp(connection, newID, first, last, username, email, password, city, zip, state, country, token)
  }, function(reason) {
    console.log("Failed to create account: "+reason); // Error!
  }) //if signing up went successful - log the user in and return the data
  .then(function (data) {
      console.log("Signing up, succesful. Now attempting to sign in: ");
      return SQL.login(connection, email, password);
  })
  .then(function (data) {
      console.log("Signing in successful, data: "+data);
      res.status(200).send(JSON.stringify(data)); //send back the user info in string form
  });
});



app.get('/confirmSignedIn',(req,res) =>{
    console.log("URL: "+ req.url );

    //parse our url to get the fields we want
    let uri = req.url.replace("/confirmSignedIn?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
    uri = uri.replace(/token=/i, ''); //strip out the email and password name fields
    uri = uri.replace(/userID=/i, ''); //strip out the email and password name fields
    //gablergab&dude%40wpi.edu
    let uriSplit = uri.split('&'); //now we have an array of the email and password
    //Desired, variables holding individual strings
    var token=uriSplit[0];
    var userID=uriSplit[1];
    console.log("token = "+token+", userID = "+userID);

    //attempt to login, if success, then assign new token
    var p1 = SQL.confirmSignedIn(connection, token, userID);
    p1.then(function(data) { // User succesfully logged in!
        //console.log('User Info: ', JSON.stringify(data));
        res.status(200).end(JSON.stringify(data));
    }, function(reason) {
        console.log("Failed to login: "+reason); // Error!
    });
});


/* Handle get login requests from the client */
app.get('/login',(req,res) =>{
  console.log("URL: "+ req.url ); //Starting URL: /login?username=gablergab&email=dude%40wpi.edu

  //parse our url to get the fields we want
  let uri = req.url.replace("/login?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
   uri = uri.replace(/email=/i, ''); //strip out the email and password name fields
   uri = uri.replace(/password=/i, ''); //strip out the email and password name fields
  //gablergab&dude%40wpi.edu
  let uriSplit = uri.split('&'); //now we have an array of the email and password
  //Desired, variables holding individual strings
  var email=uriSplit[0].replace(/%40/i, '@'); //conver this back to %40
  var password=uriSplit[1];
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

/** VoteForBoard
 * The user is on the browser page and has clicked vote on a board that isnt implemented yet
 * Insert this vote to our database for feedback on user preferances
 */
app.post('/VoteForBoard',(req,res) =>{
    console.log("URL: "+ req.url );
    let boardID=req.body.boardID;
    let userID=req.body.userID;
    console.log("boardID: "+ boardID +" userID: "+ userID);

    var p1 = SQL.voteForBoard(connection, boardID, userID);
    p1.then(function(data) {
        console.log("Vote inserted successfully: "+ data);
        res.status(200).end("Good");
    }, function(reason) {
        console.log("fail: "+reason); // Error!
    });
});



//Fetch the instagram access token and basic user data - still need ot fetch actual data
app.post('/fetchInstaData',(req,res) =>{
    console.log("URL: "+ req.url );
    let code=req.body.code;
    let boardID=req.body.boardID;
    let userID=req.body.userID;
    console.log("code: "+ code + " boardID: "+ boardID +" userID: "+ userID  );

    //Get the access token and user info!
    var p1 = APIs.getInstagramAccessToken(code);
    p1.then(function(APIData) { // User succesfully logged in!
        console.log('**[1], Instagram User Info: ', APIData.toString());
        return SQL.updateInstagramProfileData(boardID, userID, APIData, connection);         //insert access token and profile information to database
    }, function(reason) {
        console.log("Failed to login: "+reason); // Error!
    })
    //Chained Promise - Now go retrieve basic profile data (followers, follows, photos)
    .then(function (access_token) {
        console.log("**[2], access_token: "+access_token);
        return APIs.getInstagramStats(access_token); //retrieve other information
    })
    .then(function (APIData) {
        console.log("**[3], APIData: "+APIData);
        return SQL.updateInstagramData(boardID, userID, APIData, connection); //insert other info to the database
    })
    .then(function (data) {
        console.log("**[4], Now update the user to follow this board in the database boardaccountlink table");
        SQL.followBoard(boardID, userID, connection); //Update database
        res.status(200).end(JSON.stringify("GOOD")); //might not need to send data back.. send next page back
    });

});


/** fetchboards from the database for the browse page
 * This is called when the user is on the browse page - populate with the returned data
 */
app.get('/fetchboards',(req,res) =>{
    var p1 = SQL.fetchBoards(connection);
    p1.then(function(boardData) {
        console.log("Board info fetched: "+ boardData);
        res.status(200).end(JSON.stringify(boardData));
    }, function(reason) {
        console.log("fail: "+reason); // Error!
    });
});

//getmy board info getmyboardinfo
app.get('/getmyboardinfo',(req,res) =>{
  console.log("/URL: "+ req.url );
  let uri = req.url.replace("/getmyboardinfo?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
   uri = uri.replace(/userid=/i, ''); //strip out the email and password name fields
  //gablergab&dude%40wpi.edu
  let userID=uri;  //Desired, variables holding individual strings
    if(userID=="")
        userID = 0;
    console.log("userID"+ userID );

  var p1 = SQL.getMyBoardInfo(connection, userID);
  p1.then(function(myBoardInfo) {
      console.log("This user's board information: "+ myBoardInfo);
      res.status(200).end(JSON.stringify(myBoardInfo));
  }, function(reason) {
      console.log("fail: "+reason); // Error!
  });
});


app.get('/getBoardStats',(req,res) =>{
  console.log("URL: "+ req.url ); //Starting URL: /getBoardStats?boardID=1
  let uri = req.url.replace("/getBoardStats?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
  uri = uri.replace(/boardID=/i, ''); //strip out
  let boardID=uri;

  var p1 = SQL.getBoardStats(connection, boardID);
  p1.then(function(boardStats) {
      console.log("This board stats are: "+ boardStats);
      res.status(200).end(JSON.stringify(boardStats));
  }, function(reason) {
      console.log("fail: "+reason); // Error!
  });
});


//When we load the leaderboard page based on filters from the filter section!
app.get('/leaderboard',(req,res) =>{
  console.log("URL: "+ req.url );
  let uri = req.url.replace("/leaderboard?", '').replace(/%20/i, ' ');//replace space char with a space; //strip out the path  //username=gablergab&email=dude%40wpi.edu
   uri = uri.replace(/boardID=/i, ''); //strip out
   uri = uri.replace(/scoreID=/i, ''); //strip out
   uri = uri.replace(/statTime=/i, ''); //strip out
   uri = uri.replace(/statLocation=/i, ''); //strip out
   uri = uri.replace(/userID=/i, ''); //strip out
   uri = uri.replace(/city=/i, ''); //strip out
   uri = uri.replace(/state=/i, ''); //strip out
   uri = uri.replace(/country=/i, ''); //strip out

  //***** add user id to this maybe here
  let uriSplit = uri.split('&');

  //Desired, variables holding individual strings
  let boardID=uriSplit[0];
  let scoreID=uriSplit[1].replace(/%20/i, ' ');
  let statTime=uriSplit[2];
  let statLocation=uriSplit[3];
  let userID=uriSplit[4];
  let city=uriSplit[5];
  let state=uriSplit[6];
  let country=uriSplit[7];
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
               " where S.scoreID = "+scoreID+ ""+
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
  //Starting URL: /connectto/3?username=andrewrot&password=1fivesive
  let uri = req.url.replace("/connectto/", ''); //strip out the path
   uri = uri.replace(/userID=/i, ''); //strip out the email and password name fields
   uri = uri.replace(/email=/i, ''); //strip out the email and password name fields
   uri = uri.replace(/password=/i, ''); //strip out the email and password name fields

    //Messy - lets clean this up soon
  let uriSplit1 = uri.split('?');//break into [#, username=XXX&password=XXX]
  let boardID = uriSplit1[0]; //first element is the boardID

  let uriSplit = uriSplit1[1].split('&'); //now we have an array of the email and password
//Desired, variables holding individual strings
  let userID=uriSplit[0];
  let email=uriSplit[1].replace(/%40/i, '@'); //conver this back to @ from %40
  let password=uriSplit[2];

  console.log("boardID = "+boardID+ " userID = "+userID+ ", email = "+email+", password = ***");
  
  //Attempt to login to the application. If successful, return the data in object form* OLD
  //Connect to API, then send data to database directly. Pass the connection as well
  var p1 = APIRouter.connectToAPI(boardID, email, password);
  p1.then(function(APIData) {
    console.log("--------------: "+ APIData);
    return database.insertData(boardID, userID, APIData, connection);
    //send back data
    //res.end("end");
  }, function(reason) {
    console.log("fail: "+reason); // Error!
  })
  .then(function (data) {
      console.log("Now update the user to follow this board in the database boardaccountlink table");
      SQL.followBoard(boardID, userID, connection); //Update database
      res.status(200).end(JSON.stringify("GOOD")); //might not need to send data back.. send next page back
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
    console.log("--------------: "+ APIData); //This is the redirect link
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
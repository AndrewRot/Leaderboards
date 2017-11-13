var API = require("./APIs.js");



module.exports = {

    // connectToAPI - a routing method to call methods for each respective company API
    // returns the data fetched from the API as an object
    connectToAPI: function(boardID, email, password) {

      console.log("connectToAPI.. boardID: "+boardID);

      switch(boardID) {
        case "1": //Fantasy Sports
           return API.connectToFantasy(boardID, email, password);//add parameters for username/password
          break;
        case "2": //Netflix
          callback(API.connectToNetflix(boardID, email, password));//add parameters for username/password
          break;
        case "3": //github
          return API.connectToGitHub(boardID, email, password); 
          break;
        case "4": //Instagram
          return API.connectToInstagram(boardID, email, password); 
          break;
      }    

    },

};


//console.log('Basic ' + new Buffer('andrewrot' + ':' + '').toString('base64') );

/*
//const fetch = require("node-fetch");
const url = "https://api.github.com/user"
  //"https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

//: 'Basic ' + new Buffer(uname + ':' + pword).toString('bae64') 

//console.log()

//create parameters
const fetchData = {
  method: 'GET',
  headers: {
    "authorization": "Basic YW5kcmV3cm90OjFvbmUxMjQ=",
    "cache-control": "no-cache",
    "postman-token": "b2275aeb-c558-4cc6-31f9-0be086dcc48d",
    "User-Agent": "leaderboards"
  },
  
  
}


fetch(url)
  .then(response => {
    response.json().then(json => {
      console.log(json);
      /*console.log(
        `City: ${json.results[0].formatted_address} -`,
        `Latitude: ${json.results[0].geometry.location.lat} -`,
        `Longitude: ${json.results[0].geometry.location.lng}`
      );
    });
  })
  .catch(error => {
    console.log(error);
  });

*/




/*
var github = require('octonode');

var client = github.client();

client.get('/users/andrewrot', {}, function (err, status, body, headers) {
  console.log(body); //json object
});



module.exports = function(app) {
 
      // Handle get login requests from the client 
  app.get('/connecttogithub',(req,res) =>{
    console.log("URL: "+ req.url );

    //parse our url to get the fields we want
    //Starting URL: /login?username=gablergab&email=dude%40wpi.edu
    var uri = req.url.replace("/connecttogithub?", ''); //strip out the path  //username=gablergab&email=dude%40wpi.edu
    var uri = uri.replace(/username=/i, ''); //strip out the email and password name fields
    var uri = uri.replace(/password=/i, ''); //strip out the email and password name fields
    var uri = uri.replace(/userID=/i, ''); //strip out the email and password name fields
    var uri = uri.replace(/boardID=/i, '');
    //gablergab&dude%40wpi.edu
    var uri = uri.split('&'); //now we have an array of the email and password
    //Desired, variables holding individual strings
    var username=uri[0];//.replace(/%40/i, '@'); //conver this back to %40
    var password=uri[1];
    var userID=uri[2];
    var boardID=uri[3];

    console.log("username = "+username+", password = "+password);
    
    var client = github.client({
      username: username,
      password: password
    });

    client.get('/user', {}, function (err, status, body, headers) {
      console.log(body); //json object
    });
  });
}*/


/*
  var ghuser = client.user('andrewrot');

  ghuser.followers(function (err, status, body, headers) {
    console.log("****** FOLLOWERS RESPONSE: "+body); //json object
    }
  ); //array of github users */

  /*
  var query = "Select * from Accounts where userID = '"+ userID + "' and password = '"+password+"'";
  console.log("QUERY:" +query);
  connection.query(query, function (err, rows, fields) {
    if (err) throw err

    console.log('User Info: ', JSON.stringify(rows));
    res.status(200).end(JSON.stringify(rows)); //first argument must be a string or buffer
  })
});*/


/*
var client = github.client({
  username: 'andrewrot',
  password: '1one124'
});

client.get('/user', {}, function (err, status, body, headers) {
  console.log(body); //json object
});

var ghuser         = client.user('andrewrot');

ghuser.followers(function (err, status, body, headers) {
  console.log("****** FOLLOWERS RESPONSE: "+body); //json object
  }
); //array of github users
*/
/* WORKING
var GitHub = require('github-api');

// basic auth
var gh = new GitHub({
   username: 'andrewrot',
   password: 'aaa' //grab later
   
});

var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
  me.listNotifications(function(err, notifications) {
   // do some stuff
   console.log("Notification: "+JSON.stringify(notifications))
});

var andrewrot = gh.getUser('andrewrot');
andrewrot.


StarredRepos(function(err, repos) {
   // look at all the starred repos!
    console.log("repos: "+SON.stringify(repos))
});
*/


/*
var GitHubApi = require('github')

var github = new GitHubApi({
    // optional
  debug: true,
  Promise: require('bluebird'),
  timeout: 5000,
  host: 'api.github.com', // should be api.github.com for GitHub
  pathPrefix: '/api/v3', // for some GHEs; none for GitHub
  protocol: 'https',
  port: 9898,
  ca: 'whatever',
  headers: {
    'accept': 'application/vnd.github.something-custom',
    'cookie': 'something custom',
    'user-agent': 'something custom'
  },
  requestMedia: 'application/vnd.github.something-custom',
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow disabling follow-redirects
  rejectUnauthorized: false, // default: true
  family: 6
})

// TODO: optional authentication here depending on desired endpoints. See below in README.

github.users.getFollowingForUser({
    // optional
    // headers: {
    //     "cookie": "blahblah"
    // },
  username: 'andrewrot'
}, function (err, res) {
  if (err) throw err
  console.log("RESPONSE: "+JSON.stringify(res))
})
*/
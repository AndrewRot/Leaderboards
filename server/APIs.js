var http = require('https'); // protocol
var database = require("./DatabaseUtility.js");
const util = require('util');
var ig = require('instagram-node').instagram();
var api = require('instagram-node').instagram();



module.exports = {


	connectToFantasy: function(boardID, email, password) {
    	console.log("Connect to Fantasy [NOT YET IMPLEMENTED]");
    },

	connectToNetflix: function(boardID, email, password) {
    	console.log("Connect to Netflix [NOT YET IMPLEMENTED]");
    },

    // connectToGitHub - a routing method to call methods for each respective company API
    connectToGitHub: function(boardID, email, password) {
    	console.log("++++++++++");
    	let convertedData; //Object to be returned

    	return new Promise(function(success, fail) {
    		let authorization = 'Basic ' + new Buffer(email + ':' + password).toString('base64');
	    	console.log('Authorization: ' +authorization);

		    console.log('Basic ' + new Buffer('andrewrottier95@gmail.com' + ':' + '1one124').toString('base64') );
	    	//Basic YW5kcmV3cm90dGllcjk1QGdtYWlsLmNvbTpwYXNzd29yZA==
	    	//Probably move this creation to a seperate methods/lib file
			var options = {
		        "method": "GET",
		        "hostname": "api.github.com",
		        "port": null,
		        "path": "/user",
		        "headers": {
		          "authorization": authorization,
		          "cache-control": "no-cache",
		          "postman-token": "b2275aeb-c558-4cc6-31f9-0be086dcc48d",
		          "User-Agent": "leaderboards"
		        }
		    };

    		var req = http.request(options, function (res) {
		        var chunks = []; //collect returning stream of data into this buffer

		        res.on("data", function (chunk) {
		          	chunks.push(chunk); 
		        });

		        res.on("end", function () {
			        var body = Buffer.concat(chunks); //recombine the stream of data
			        //console.log(body.toString());

			        //Convert data to an object
			        convertedData = JSON.parse(body);
					//console.log('Parsed to json', convertedData);
					console.log('Followers: ', convertedData.followers);
					console.log('Following: ', convertedData.following);

					success(convertedData);	//return convertedData; 

		        });
		        
	    	});
	    	req.on('error', function (e) {
		        console.log('problem with request: ' + e.message);
		        fail();
		    });
	    	req.end();
    	});

    },

    //https://api.instagram.com/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http://localhost:9000/Browse&response_type=code
    //register board for instagram now
    //dont need these parameters.... probably
    connectToInstagram: function(boardID, email, password) {

    	return new Promise(function(success, fail) {

			 /* Another attempt at IG
			http.get('https://api.instagram.com/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http://localhost:9000/Browse&response_type=token&scope=public_content', (resp) => {
			  let data = '';

			  // A chunk of data has been recieved.
			  resp.on('data', (chunk) => {
			    data += chunk;
				console.log("E");
			  });

			  // The whole response has been received. Print out the result.
			  resp.on('end', () => {
				console.log(resp);
			    console.log(JSON.parse(data).explanation);
				success(data);
			  });

			}).on("error", (err) => {
			  console.log("Error: " + err.message);
			});
			 */
    		
			var options = {
			  "method": "POST",
			  "hostname": "api.instagram.com",
			  "port": null,
			  "path": "/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2FBrowse&response_type=code",
			  "headers": {
			    "cache-control": "no-cache",
    			"postman-token": "cd2fc154-c2a9-6b9e-51f8-08e3660be929"
			  }
			};

			var req = http.request(options, function (res) {

			  var chunks = [];

			  res.on("data", function (chunk) {
			    chunks.push(chunk);
			    console.log("X");
			  });

			  res.on("end", function () {
			    var body = Buffer.concat(chunks);
			    //console.log("RES*************: "+JSON.stringify(res, null, 4));
			    //console.log(util.inspect(res, {showHidden: false, depth: null}))
			    console.log("Instagram login: "+body);

			    console.log("Instagram login: "+body.toString());
			    //var convertedData = JSON.parse(body);
			    success(body);
			  });
			});

			req.end();
			
			   

			
		})
    }

    
};




var http = require('https'); // protocol
var database = require("./DatabaseUtility.js");



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

    	//setTimeout(function(){
	      //console.log("Timeout: "+JSON.stringify(APIData))
	      //database.insertData(boardID, userID, APIData, connection);
	    //}, 2000);

    	/*
    	console.log("Github");
    	console.log('Email: ' + email  +', Pass: ***'  );

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

				//return convertedData; 
	        	///callback(convertedData);
	        });

	        req.on('error', function (e) {
		        console.log('problem with request: ' + e.message);
		    });
	    });

	    req.end();
	}



	return convertedData;
	    */
	    /*return postCodeCheck(function (data) {
	    	//console.log("GOT DATA: "+pCLatLng.toString())
	    	//console.log("GOT DATA: "+JSON.stringify(pCLatLng))
		    return data;
		});*/
		//console.log(x);
		//return x;

		
	    //wait until we finish calculating
	    
	    //return convertedData;

	      //req.end(convertedData);
	      
	      //console.log('Basic ' + new Buffer('andrewrottier95@gmail.com' + ':' + '').toString('base64') );

    },

    //https://api.instagram.com/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http://localhost:9000/Browse&response_type=code
    //register board for instagram now
    //dont need these parameters.... probably
    connectToInstagram: function(boardID, email, password) {

    	return new Promise(function(success, fail) {
			var options = {
			  "method": "GET",
			  "hostname": "api.instagram.com",
			  "port": null,
			  "path": "/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2FBrowse&response_type=code",
			  "headers": {
			    "cache-control": "no-cache",
			    "postman-token": "4d877522-9180-05c7-7e69-08378447c3e7"
			  }
			};

			var req = http.request(options, function (res) {
			  var chunks = [];

			  res.on("data", function (chunk) {
			    chunks.push(chunk);
			  });

			  res.on("end", function () {
			    var body = Buffer.concat(chunks);
			    console.log(body.toString());
			    convertedData = JSON.parse(body);
			    success(convertedData);
			  });
			});

			req.end();
		})
    }

    
};




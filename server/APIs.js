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
    	let convertedData; //Object to be returned

    	console.log("Github");
    	console.log('Email: ' + email  +', Pass: ***'  );

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
				console.log('Parsed to json', convertedData);
				console.log('Followers: ', convertedData.followers);
				console.log('Following: ', convertedData.following);

				//Send this data to our database
				//database.insertData(boardID, userID, convertedData, connection);

				//return convertedData; //not sure if this should be moved to the end
	        	

	        	//NEED TO FIND A WAY TO RETURN convertedData!!!!!
	        });
	    });
	    req.end();
	    //wait until we finish calculating
	    
	    //return convertedData;

	      //req.end(convertedData);
	      
	      //console.log('Basic ' + new Buffer('andrewrottier95@gmail.com' + ':' + '').toString('base64') );

    },


    
};




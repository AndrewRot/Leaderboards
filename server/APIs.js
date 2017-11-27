var http = require('https'); // protocol
var database = require("./DatabaseUtility.js");
const util = require('util');
var api = require('instagram-node').instagram();
var querystring = require('querystring');
var request = require('request');


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


    		//WORKS - Grabs the HTML of the new page... grab the href fromt he header and updated the user's window
            request({followAllRedirects: true,
				 url: 'https://api.instagram.com/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http://localhost:9000/AuthInstagram&response_type=code'},
				function (error, response, body) {
                    //console.log('****************************** First response *************************');
					console.log('error:', error); // Print the error if one occurred
					console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('href:', response.request.href); //Page we want our browser to load
					console.log('body:', body); // Print the HTML for the Google homepage.

                    var url = response.request.href;
                    success(url);
				});


		})
    },

    getInstagramAccessToken: function(code) {

        return new Promise(function (success, fail) {

			request.post(
                { form: { client_id: '14054d3b12e14fdba3031ba55a5a5885',
                    client_secret: '8f1113b89c434eacafd4b0f9d3c0a5d1',
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost:9000/AuthInstagram',
                    code: code
                },
                    url: 'https://api.instagram.com/oauth/access_token'
                },
                function (err, response, body) {
                    if (err) {
                        console.log("error in Post", err);
                    }else{
                        //console.log("This should be the access token stuff"+JSON.parse(body));
                        console.log("This should be the access token stuff"+body.toString());

                        success(body);
                    }
                }
            );
        })
    },

	//Fetch the instagram statistics
    //https://api.instagram.com/v1/users/self/?access_token=45481514.14054d3.d69d14db497c4f7fab63a4cb5104fa3b
    getInstagramStats: function(access_token) {

        return new Promise(function (success, fail) {
            request({followAllRedirects: true,
                    url: 'https://api.instagram.com/v1/users/self/?access_token='+access_token},
                function (error, response, body) {
                    //console.log('****************************** First response *************************');
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('href:', response.request.href); //Page we want our browser to load
                    console.log('body:', body); // Print the HTML for the Google homepage.

                    var url = response.request.href;
                    success(url);
                });
        });
    }

    
};



//WORKS - Grabs the HTML of the new page... grab the href fromt he header and updated the user's window
/*request({
        followAllRedirects: true,
        url: 'https://api.instagram.com/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http://localhost:9000/AuthInstagram&response_type=code'
    },
    function (error, response, body) {
        //console.log('****************************** First response *************************');
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('href:', response.request.href); //Page we want our browser to load
        console.log('body:', body); // Print the HTML for the Google homepage.

        var url = response.request.href;
        success(url);
    });*/


///USE THIS with the code returned in the URL
//https://api.instagram.com/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http://localhost:9000/Browse&response_type=code
/*request.post(
    { form: { client_id: '14054d3b12e14fdba3031ba55a5a5885',
        client_secret: '8f1113b89c434eacafd4b0f9d3c0a5d1',
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:9000/Browse',
        code: code
    },
        url: 'https://api.instagram.com/oauth/access_token'
    },
    function (err, response, body) {
        if (err) {
            console.log("error in Post", err);
        }else{
            console.log(JSON.parse(body));
        }
    }
);*/

//This gets a 302 direct message - however, not sure how to handle that reponse?
/*
			var options ={
                method: "POST",
                hostname: "api.instagram.com",
                port: null,
                path: "/oauth/authorize/?client_id=14054d3b12e14fdba3031ba55a5a5885&redirect_uri=http%3A%2F%2Flocalhost%3A9000%2FBrowse&response_type=token&scope=public_content",
                headers: {
                    'cache-control': "no-cache",
                    'postman-token': "534bffc6-644a-f34d-6b61-9adebd290ac4"
                }
			};

			var req = http.request(options, function (res) {
                res.setEncoding('utf8');
                console.log("statuscode: "+res.statusCode);
                console.log(JSON.stringify(res.headers));

                var chunks = [];

			  res.on("data", function (chunk) {
			    chunks.push(chunk);
			    console.log(chunk);
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
*/

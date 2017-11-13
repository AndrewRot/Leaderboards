//This file contains specific queries/insertions into our database
var database = require("./DatabaseUtility.js");
var utils = require("./Utilities.js");


module.exports = {


	//insert data to github board
    updateFantasyData: function(boardID, userID, APIData, connection) {
    	console.log("Insert to Fantasy [NOT YET IMPLEMENTED]");
    },
    //insert data to github board
    updateNetflixData: function(boardID, userID, APIData, connection) {
    	console.log("Insert to Netflix [NOT YET IMPLEMENTED]");

    },
	//insert data to github board
    updateGithubData: function(boardID, userID, APIData, connection) {
    	console.log("Insert to Github");

    	//TO-DO list for these things
    	//Generate the current date of this insertion. Time.now() or something
    	//Also, replace hardcoded Followers with the key value of the object
    	//Move these queries to seperate files - turn them into a list
    	//-then iterate through the list of queries in a for loop
    	var query = "insert into Scores values("+boardID+", "+userID+", 1, "+APIData.followers+", 'Followers', CURDATE () ) " + 
    				"ON DUPLICATE KEY UPDATE " +
  						"score = GREATEST(score, "+APIData.followers+")";
		console.log("QUERY:" +query);
		connection.query(query, function (err, rows, fields) {
		    if (err) throw err
		    console.log('Inserted: ', rows)
		})

		var query = "insert into Scores values("+boardID+", "+userID+", 2, "+APIData.following+", 'Followering', CURDATE () ) " + 
    				"ON DUPLICATE KEY UPDATE " +
  						"score = GREATEST(score, "+APIData.following+")";
		console.log("QUERY:" +query);
		connection.query(query, function (err, rows, fields) {
		    if (err) throw err
		    console.log('Inserted: ', rows)
		})

		var query = "insert into Scores values("+boardID+", "+userID+", 3, "+APIData.public_repos+", 'Public Repos', CURDATE () ) " + 
    				"ON DUPLICATE KEY UPDATE " +
  						"score = GREATEST(score, "+APIData.public_repos+")";
		console.log("QUERY:" +query);
		connection.query(query, function (err, rows, fields) {
		    if (err) throw err
		    console.log('Inserted: ', rows)
		})


    },

    getNextUserID: function(connection){
        return new Promise(function(success, fail) {
            var query = "SELECT COUNT(*) as count FROM Accounts;";
            connection.query(query, function (err, rows, fields) {
                if (err) {
                    throw err
                    fail();
                }
                var newID = parseInt(rows[0].count)+1;
                console.log('New userID: ', newID);
                success(newID);
            })
        })
     },

     login: function(connection, email, password){
        return new Promise(function(success, fail) {
            var query = "Select * from Accounts where email = '"+ email + "' and password = '"+password+"'";
            connection.query(query, function (err, rows, fields) {
                if (err) {
                    throw err
                    fail();
                }
                //now generate token and assign it in the database
                var token= utils.generateToken();
                var query = " UPDATE Accounts SET token = '"+ token + "' WHERE email = '"+ email + "' and password = '"+password+"'";
                connection.query(query, function (err, rows, fields) {
                    if (err) {
                        throw err
                        fail();
                    }
                    //Now requery for the user to get his information + token
                    var query = "Select * from Accounts where email = '"+ email + "' and password = '"+password+"'";
                    connection.query(query, function (err, rows, fields) {
                        if (err) {
                            throw err
                            fail();
                        }
                        console.log('Logged in with assigned token: ', rows);
                        success(rows); //return the logged in user's info!
                    })
                })
            })
        })
     },



    //write one for creating a query string
};
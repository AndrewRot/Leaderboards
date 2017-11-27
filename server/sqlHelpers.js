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


    //insert data to instagram board
    updateInstagramData: function(boardID, userID, APIData, connection) {
        console.log("Insert to Instagram");

        //TO-DO list for these things
        //Also, replace hardcoded Followers with the key value of the object
        //Move these queries to seperate files - turn them into a list
        //-then iterate through the list of queries in a for loop
        //Think of elequint way to pass along the scoreID - maybe make this a pairing, like a name and an ID -
        //Kongregate does it by score name - so if that is unique.. boardID/scoreName would make it unique..

        //Insert followers stats
        var query = "insert into Scores values("+boardID+", "+userID+", 1, "+APIData.counts.followed_by+", 'Followers', CURDATE () ) " +
            "ON DUPLICATE KEY UPDATE " +
            "score = GREATEST(score, "+ APIData.counts.followed_by +")";
        console.log("QUERY:" +query);
        connection.query(query, function (err, rows, fields) {
            if (err) throw err
            console.log('Inserted: ', rows)
        })

        //Insert following stats
        var query = "insert into Scores values("+boardID+", "+userID+", 2, "+APIData.counts.follows+", 'Following', CURDATE () ) " +
            "ON DUPLICATE KEY UPDATE " +
            "score = GREATEST(score, "+APIData.counts.follows+")";
        console.log("QUERY:" +query);
        connection.query(query, function (err, rows, fields) {
            if (err) throw err
            console.log('Inserted: ', rows)
        })

        //Insert media stats
        var query = "insert into Scores values("+boardID+", "+userID+", 3, "+APIData.counts.media+", 'Photos Taken', CURDATE () ) " +
            "ON DUPLICATE KEY UPDATE " +
            "score = GREATEST(score, "+APIData.counts.media+")";
        console.log("QUERY:" +query);
        connection.query(query, function (err, rows, fields) {
            if (err) throw err
            console.log('Inserted: ', rows)
        })
    },

    /** getNextUserID
     * finds the next available userID by query the database. Returns a promise containing the next ID
     * @param {Connection} connection: the connection to the database 
     * @return {Promise(integer)} next available ID for a new user
     */
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

     /** login
     * Attempts to log a user in. If successful, assigns the user a new Token, updates it in the database, then we requery to get the full set of data to return to the client
     * @param {Connection} connection: the connection to the database 
     * @param {Email} the email of the user
     * @param {Password} the password of the user
     * @return {Promise (JSON)} the logged in user's information in JSON format
     */
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



};
//This file contains specific queries/insertions into our database
var database = require("./DatabaseUtility.js");


module.exports = {


	//insert data to github board
    updateFantasyData: function(boardID, userID, convertedData, connection) {
    	console.log("Insert to Fantasy [NOT YET IMPLEMENTED]");
    },
    //insert data to github board
    updateNetflixData: function(boardID, userID, convertedData, connection) {
    	console.log("Insert to Netflix [NOT YET IMPLEMENTED]");

    },
	//insert data to github board
    updateGithubData: function(boardID, userID, convertedData, connection) {
    	console.log("Insert to Github");

    	//Generate the current date of this insertion. Time.now() or something
    	var query = "insert into Scores values("+boardID+", "+userID+", 1, "+APIData.followers+", 'Followers', '2017-08-31' ) " + 
    				"ON DUPLICATE KEY UPDATE " +
  						"score = GREATEST(score, "+APIData.followers+")";
		console.log("QUERY:" +query);
		connection.query(query, function (err, rows, fields) {
		    if (err) throw err
		    console.log('Inserted: ', rows)
		})


    },


    //write one for creating a query string
};
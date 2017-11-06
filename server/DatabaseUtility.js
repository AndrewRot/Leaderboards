  
var mysql = require('mysql');
var SQL = require("./sqlHelpers.js");

//perform a count on the current users and then return that +1 -not implementedyet
module.exports = {


	//Return a connection to the database
    connectToDatabase: function() {
    	var connection = mysql.createConnection({
		  	host     : 'localhost',
			user     : 'root',
			password : 'password',
			database : 'leaderboards'
		 });

		connection.connect(function(err){
			if(!err) {
			    console.log("Database is connected ... \n\n");  
			 } else {
			    console.log("Error connecting database ... \n\n");  
			 }
		 });

		return connection;
    },

    insertData: function(boardID, userID, APIData, connection) {
    	console.log("insertData");
    	switch(boardID) {
	        case "1": //Fantasy Sports
	          SQL.updateFantasyData(boardID, userID, APIData, connection); 
	          break;
	        case "2": //Netflix
	          SQL.updateNetflixData(boardID, userID, APIData, connection); 
	          break;
	        case "3": //github
	          SQL.updateGithubData(boardID, userID, APIData, connection); 
	          break;
	      }    
       
    }

    //write one for creating a query string
};
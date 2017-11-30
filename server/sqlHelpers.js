//This file contains specific queries/insertions into our database
var database = require("./DatabaseUtility.js");
var utils = require("./Utilities.js");


module.exports = {


	//insert data to github board
    updateFantasyData: function(boardID, userID, APIData, connection) {
        return new Promise(function (success, fail) {
            console.log("Insert to Fantasy [NOT YET IMPLEMENTED]");
            success("Good");
        });
    },
    //insert data to github board
    updateNetflixData: function(boardID, userID, APIData, connection) {
        return new Promise(function (success, fail) {
            console.log("Insert to Netflix [NOT YET IMPLEMENTED]");
            success("Good");
        });

    },
	//insert data to github board
    updateGithubData: function(boardID, userID, APIData, connection) {
        return new Promise(function (success, fail) {
            console.log("Insert to Github");

            //TO-DO list for these things
            //Generate the current date of this insertion. Time.now() or something
            //Also, replace hardcoded Followers with the key value of the object
            //Move these queries to seperate files - turn them into a list
            //-then iterate through the list of queries in a for loop
            var query = "insert into Scores values(" + boardID + ", " + userID + ", 1, " + APIData.followers + ", 'Followers', CURDATE () ) " +
                "ON DUPLICATE KEY UPDATE " +
                "score = GREATEST(score, " + APIData.followers + ")";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
            })

            var query = "insert into Scores values(" + boardID + ", " + userID + ", 2, " + APIData.following + ", 'Followering', CURDATE () ) " +
                "ON DUPLICATE KEY UPDATE " +
                "score = GREATEST(score, " + APIData.following + ")";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
            })

            var query = "insert into Scores values(" + boardID + ", " + userID + ", 3, " + APIData.public_repos + ", 'Public Repos', CURDATE () ) " +
                "ON DUPLICATE KEY UPDATE " +
                "score = GREATEST(score, " + APIData.public_repos + ")";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
            })
            success("good");
        });
    },


    //insert data to instagram board
    updateInstagramProfileData: function(boardID, userID, APIData, connection) {
        return new Promise(function (success, fail) {
            console.log("Insert basic profile information from Instagram to our database");

            console.log("DATA");
            console.log("instagram_access_token: " + APIData.access_token);
            console.log("instagram_id: " + APIData.user.id);
            console.log("instagram_username: " + APIData.user.username);

            //Insert followers stats
            var query = "Update Accounts " +
                "set instagram_access_token = '" + APIData.access_token + "', " +
                "instagram_id = '" + APIData.user.id + "', " +
                "instagram_username = '" + APIData.user.username + "' " +
                "where userID = " + userID;
            console.log("QUERY: " + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
                success( APIData.access_token);
            })
        });


    },
    updateInstagramData: function(boardID, userID, APIData, connection) {
        return new Promise(function (success, fail) {
            //TO-DO list for these things
            //Also, replace hardcoded Followers with the key value of the object
            //Move these queries to seperate files - turn them into a list
            //-then iterate through the list of queries in a for loop
            //Think of elequint way to pass along the scoreID - maybe make this a pairing, like a name and an ID -
            //Kongregate does it by score name - so if that is unique.. boardID/scoreName would make it unique..

            //Insert followers stats
            var query = "insert into Scores values(" + boardID + ", " + userID + ", 1, " + APIData.data.counts.followed_by + ", 'Followers', CURDATE () ) " +
                "ON DUPLICATE KEY UPDATE " +
                "score = GREATEST(score, " + APIData.data.counts.followed_by + ")";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
            })

            //Insert following stats
            var query = "insert into Scores values(" + boardID + ", " + userID + ", 2, " + APIData.data.counts.follows + ", 'Following', CURDATE () ) " +
                "ON DUPLICATE KEY UPDATE " +
                "score = GREATEST(score, " + APIData.data.counts.follows + ")";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
            })

            //Insert media stats
            var query = "insert into Scores values(" + boardID + ", " + userID + ", 3, " + APIData.data.counts.media + ", 'Photos Taken', CURDATE () ) " +
                "ON DUPLICATE KEY UPDATE " +
                "score = GREATEST(score, " + APIData.data.counts.media + ")";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Inserted: ', rows)
            });
            success("Good");
        });
    },

    /** followBoard: adds teh board to the user's followed boards - if they already arent following
     *
     */
    followBoard: function (boardID, userID, connection) {
        return new Promise(function (success, fail) {
            var query = "insert IGNORE into BoardAccountLink values(" + userID + "," + boardID + ");";
            console.log("QUERY:" + query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err

                console.log('Inserted: ', rows)
                success("Good");
            })
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

    /** signUp
     *  Signs up the user given the information he passed in from the forms
     *  @param {Connection} connection: the connection to the database
     *  @param {fields - generic} all the other fields to be inserted into the database
     *  return information regarding a successful insert to the db
     *  *Not currently using the zip code field - will need to add spot for this in database and refactor
     */
    signUp: function(connection, newID, first, last, username, email, password, city, zip, state, country, token) {
        return new Promise(function (success, fail) {
            //The last three fields are for instagram account info - since they haven't linked yet, leave blank
            var query = "insert into Accounts values(" +newID+",'"+first+"','"+last+"','"+username+"','"+email+"','"+password+"','"+city+"','"+state+"','"+country+"','"+token+"' , '' , '', '');";
            console.log("QUERY:" +query);
            connection.query(query, function (err, rows, fields) {
                if (err) {
                    fail(err); //return fail or throw error.. figure out
                    throw err
                }
                console.log('Created Account: ', rows);
                success(rows);
            })
        })
    },

    /** fetchBoards
     *  fetch last 9 boards to follow
     */
    fetchBoards: function(connection) {
        return new Promise(function(success, fail) {
            var query = "Select * from Boards limit 9";
            console.log("QUERY:" +query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                success(rows); //first argument must be a string or buffer
            })
        })
    },

    /** getBoardStats
     * when a board is selected on the leaderboards page form the drop down - auto populate the stat type drop down
     */
    getBoardStats: function (connection, boardID) {
        return new Promise(function (success, fail) {
            var query = "Select DISTINCT scoreID, scoreName from Scores S where S.boardID = "+boardID + "  ";
            console.log("QUERY: " +query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Fetched board statTypes: ', JSON.stringify(rows));
                success(rows); //first argument must be a string or buffer
            })
        })
    },

    /** voteForBoard
     *  Insert the vote for the board
     * @param connection
     * @param boardID - board voted for
     * @param userID - user voting for the board
     * @returns {Promise}
     */
    voteForBoard: function (connection, boardID, userID) {
        return new Promise(function (success, fail) {
            //var query = "Select DISTINCT scoreID, scoreName from Scores S where S.boardID = "+boardID + "  ";
            var query = "insert IGNORE into BoardVotes values(" + userID + "," + boardID + ");";

            console.log("QUERY: " +query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Fetched board statTypes: ', JSON.stringify(rows));
                success(rows); //first argument must be a string or buffer
            })
        })
    },

    /** getMyBoardInfo
     *  This infomation is needed when the user goes to teh leaderboard page, we need to populate the dropdown menus with their board information
     */
    getMyBoardInfo: function(connection, userID) {
        return new Promise(function (success, fail) {
            var query = "Select * from BoardAccountLink BAL, Boards B where userID ="+userID + " and B.boardID = BAL.boardID";
            console.log("QUERY:" +query);
            connection.query(query, function (err, rows, fields) {
                if (err) throw err
                console.log('Fetched boards: ', JSON.stringify(rows));
                success(rows); //first argument must be a string or buffer
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
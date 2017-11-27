import React, { Component } from 'react';
import $ from 'jquery';
import {Jumbotron, Button} from 'react-bootstrap';



//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class InstagramRedirect extends Component {

    constructor(props) {
        super(props);
        //function bindings

        this.state = {

            boardID: 4,
            //userID: getIDFromToken(getCookie('token')),//pass along ID

        };
    }

//This class needs to contain the userID and the boardID
    //pass this on from the previous browse page
  
// we have recieved the user's access token, now lets use it to fetch some API database
componentWillMount() {

    console.log("Connecting with instagram, Attempt to fetch user token and data");
    //http://localhost:9000/AuthInstagram?code=bddc1f12337146dab7fb0ebb7d214458
    console.log("window.location.href: "+window.location.href); //extract the code from this and pass it as a paramenter


    //uribuilding?
    let code = window.location.href;
    //UPDATE HERE WHEN WE HAVE OUT OWN DOMAIN
    code = code.replace("http://localhost:9000/AuthInstagram?code=", '');//This will have to be better to handle changes in URL - especially when we host it on our domain
    console.log("Isolated code: "+code);

    let url = "http://localhost:9000/fetchInstaData";

    // Get saved data from sessionStorage
    var userID = sessionStorage.getItem('userID');
    var boardID = sessionStorage.getItem('boardID');
    //console.log("userID: "+userID);
    //console.log("boardID: "+boardID);


    //use the code to get the access token, then some stats
    $.post(url ,{code: code, boardID: boardID, userID: userID}, (data, status) => {
          console.log("Response from server was ["+status+"] and the data:  " + data);
          //Get the access token and user information here, store it in the database, update the cookie?

        // Remove all saved data from sessionStorage
        sessionStorage.clear();

        //Fetch user stats
        let url2 = "http://localhost:9000/fetchInstaUserData";
        $.post(url2 ,{}, (data, status) => {

        });

        //use retruned data to navigate to next page
    });


    //window.location="/LeaderboardMain"; //Add parameters to the route - this will set our initial statevalues/ determine what to query for data types/fields/score types of the select board
    //something like /LeaderboardMain/boardName/scoreType
    //Example:       /LeaderboardMain/Instagram/totalLikes
}

  

  render() {
      return (
          <Jumbotron>
              <h1>Signed in to Instagram</h1>
              <p>You have successfully logged in with Instagram, you will now be able to view your rankings.</p>
              <p><Button bsStyle="primary" block >View leaderboard</Button></p>
          </Jumbotron>
    )
  }
}


function getCookie(cname) {
    //console.log("Looking in cookie for: "+cname);
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            var str = c.substring(name.length, c.length);
            //console.log("found it: "+str);
            return str;
        }
    }
    //console.log("Did not find it");
    return "";
}

export default InstagramRedirect;


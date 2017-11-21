import React, { Component } from 'react';
import $ from 'jquery';



//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class InstagramRedirect extends Component {


  
// we have recieved the user's access token, now lets use it to fetch some API database
componentWillMount() {

    console.log("Connecting with instagram, Attempt to fetch user token and data");
    //http://localhost:9000/AuthInstagram?code=bddc1f12337146dab7fb0ebb7d214458
    console.log("window.location.href: "+window.location.href); //extract the code from this and pass it as a paramenter

    //uribuilding?
    var parser = document.createElement('a');
    parser.href = window.location.href;
    let code = parser.code.replace("?code=", '');// "?code=1232eder234wref34"
    console.log("Isolated code: "+code);

    let url = "http://localhost:9000/fetchInstaData";

    $.get(url ,{code: code}, (data, status) => {
          console.log("Response from server was ["+status+"] and the data:  " + data);
          //Get the access token and user information here, store it in the database, update the cookie?
          
    });
    window.location="/LeaderboardMain"; //Add parameters to the route - this will set our initial statevalues/ determine what to query for data types/fields/score types of the select board
    //something like /LeaderboardMain/boardName/scoreType
    //Example:       /LeaderboardMain/Instagram/totalLikes
}

  

  render() {
      return (
        <div>
        <h1> Instagram Redirect Page </h1>
        </div>
    )
  }
}

export default InstagramRedirect;


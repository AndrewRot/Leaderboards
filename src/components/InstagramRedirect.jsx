import React, { Component } from 'react';
import $ from 'jquery';



//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class SignInPage extends Component {

  constructor(props) {
    super(props);
    
  }

 
  
// we have recieved the user's access token, no lets totally use it to fetch some API database
componentWillMount() {

    console.log("Connecting with instagram");

    //this honestly might have to be a put. its fetch API data a.. maybe not - and then post to the datab
     $.get("http://localhost:9000/fetchInstaData",{}, (data, status) => {
          //data returned is an array named list - contains boards form the DB
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
         
    });
    window.location="/LeaderboardMain";
  }

  

  render() {



      return (
        <div>
        suck it
        </div>
    )
  }
}


// <input type="submit" username="Submit"   />
export default SignInPage;


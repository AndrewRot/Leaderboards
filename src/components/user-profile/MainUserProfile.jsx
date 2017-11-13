import React, { Component } from 'react';
import UserProfileBody from './UserProfileBody.react.js';
import SignInPage from './SignInPage.react.js';
import Navigationmenu from './Nav.react.js';
import Utils from './Utilities'
//import * as cookieHandler from "./cookieHandler.js"; //if this doesnt work but in sub directory here



//Incorperate different things to make these pages more complex
class MainUserProfile extends Component {

  constructor(props) {
    super(props);
    //function bindings
    
    //fields - try and load them from the cookie
    this.state = {
      isLoggedIn: (getCookie("loggedin") === "true") ? true:false, //load this from cookie - this is a string when returned! - convert it to bool value
      username: getCookie("username"),
      email: getCookie("email"),
      //password: getCookie("password"),
    };
  }


  render() {
  	//Determine what page to display - whether or not the user is logged in
  	let isLoggedIn = this.state.isLoggedIn;
    //if logged in, display the information on the page    
    if (isLoggedIn) { //**** In the future we will perform  a system token authenitcation. grabbing the cookie's token and check to see if it's still alive on our server
    	console.log("Logged in ");
    	return (
	       <div className="App">
	        <Navigationmenu />
	        
	        <UserProfileBody />
	      </div>
      );
    } 

    //Not signed in - render sign in page
    else {
    	console.log("Not Logged in ");
    	return (
	       <div className="App">
	        <Navigationmenu />
	        
	        <SignInPage />
	      </div>

    	);
    }

  }
}

export default MainUserProfile;


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


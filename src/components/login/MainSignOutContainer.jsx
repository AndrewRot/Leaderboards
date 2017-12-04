import React, { Component } from 'react';


//Incorperate different things to make these pages more complex
class MainSignOut extends Component {


  constructor(props) {
    super(props);
    //function bindings
    
    //fields - try and load them from the cookie
    this.state = {
      isLoggedIn: (getCookie("loggedin") === "true") ? true:false, //load this from cookie - this is a string when returned! - convert it to bool value
      username: getCookie("username"),
      email: getCookie("email"),
      password: getCookie("password"),
    };
  }


  render() {
  	//Determine what page to display - whether or not the user is logged in
  	let isLoggedIn = this.state.isLoggedIn;
  	console.log("isLoggedIn: "+ isLoggedIn); 
    //if logged in, display the information on the page   



     //if logged in, log them out, delete their cookie info / future, destroy token here and on server
    if (isLoggedIn) { //**** In the future we will perform  a system token authenitcation. grabbing the cookie's token and check to see if it's still alive on our server
    	console.log("Signing Out ");
      //document.cookie = "loggedin=false";

        //document.cookie = "Expires=Thu, 01 Jan 1970 00:00:01 GMT";
        eraseCookie();
        //refresh the page, it will now load out user profile
      window.location="/User";
    	
      return (
	       <div className="signout">
	      </div>
      );
    } 

    //Not signed in - render sign in page
    else {
    	console.log("Not looged in, but redirecting ");
    	eraseCookie()
      //document.cookie = "loggedin=false";
        //document.cookie = "Expires=Thu, 01 Jan 1970 00:00:01 GMT";
      //refresh the page, it will now load out user profile
      window.location="/User";
      
      return (
         <div className="signout">
        </div>
    	);
    }

  }
}

export function eraseCookie(){
    document.cookie = "loggedin=false";
    document.cookie = "userID=0";
    document.cookie = "firstname=";
    document.cookie = "lastname=";
    document.cookie = "username=";
    document.cookie = "email=";
    document.cookie = "city=";
    document.cookie = "state=";
    document.cookie = "country=";
    document.cookie = "token=";
    document.cookie = "country=";
    document.cookie = "Expires=Thu, 01 Jan 1970 00:00:01 GMT";
}


export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export default MainSignOut;




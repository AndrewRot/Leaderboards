import React, { Component } from 'react';
import $ from 'jquery';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import '../user-profile/css/UserProfileBody.css';
import Cookies from 'universal-cookie';


//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class SignInPage extends Component {

  constructor(props) {
    super(props);
    //function bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    //fields
    this.state = {
      //isLoggedIn: getCookie("loggedin"), //change this to look at the cookie for
      first: '',
      last: '',
      username: '',
      email: '',
      password: '',
      city: '',
      state: '',
      country: '',
    };
  }
    //Write methods for this component here
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
 
  //Handle what happens when a user tries to log in
  handleSubmit(event) {
    const email = this.state.email;
    const password = this.state.password;

    //will have to update this URL later (or just /login ?)
    $.get("http://localhost:9000/login",{email: email, password: password}, (data, status) => {
          alert("Response from server was ["+status+"] and the data:  " + data);
          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
          //convert response to js object
          const convertedData = JSON.parse(data);
          console.log("Token: "+convertedData[0].token); 

          //write to our cookie!
          updateCookie(convertedData[0]); //not working properly
          window.location="/User/"//+convertedData[0].username; **** At some point, we want everyone to have their own user page. 
          ///On server, make a route for /accounts/username and make a server function for it to return the account's information - similar to login but with limited data
    });
    //refresh the page, it will now load out user profile
    
    event.preventDefault();

  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  render() {
      return (
        <div>
          <h1> Sign in </h1>
            <form onSubmit={this.handleSubmit} class="form"  >
                
                <FormGroup controlId="email" bsSize="large" >
                  <ControlLabel>Email</ControlLabel>
                  <FormControl
                    autoFocus
                    name="email"
                    type="text"
                    value={this.state.email}
                    onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                  <ControlLabel>Password</ControlLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={this.handleChange}
                    name="password"
                    type="password" />
                </FormGroup>
               
                <Button block bsSize="large" disabled={!this.validateForm()} type="submit" >
                  Login
                </Button>
              </form>
            
            </div>
    )
  }
}

//write to the actual cookie
//updateCookie = (convertedData) => {
function updateCookie(convertedData) {
  const cookies = new Cookies();
  cookies.set('userID', convertedData.userID, { path: '/' });
  cookies.set('firstname', convertedData.firstname, { path: '/' });
  cookies.set('lastname', convertedData.lastname, { path: '/' });
  cookies.set('username', convertedData.username, { path: '/' });
  cookies.set('email', convertedData.email.replace(/%40/i, '@'), { path: '/' });
  cookies.set('city', convertedData.city.replace(/%20/i, ' '), { path: '/' });
  cookies.set('state', convertedData.state.replace(/%20/i, ' '), { path: '/' });
  cookies.set('country', convertedData.country.replace(/%20/i, ' '), { path: '/' });
  cookies.set('token', convertedData.token, { path: '/' });
  cookies.set('loggedin', true, { path: '/' });

  var d = new Date();
  d.setTime(d.getTime() + (1*24*60*60*1000)); //expires in 1 day  [days * hours * minutes * seconds * milli secs]
  var expires = d.toUTCString();
  cookies.set('expires', expires, { path: '/' });

  console.log(document.cookie);
}




// <input type="submit" username="Submit"   />
export default SignInPage;


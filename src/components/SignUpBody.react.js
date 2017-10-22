import React, { Component } from 'react';
//import Request from 'react-http-request';
//import axios from 'axios';

import $ from 'jquery';


//import {Grid, Row, Col, Thumbnail, Button, Carousel, Media} from 'react-bootstrap';
//import './UserProfileBody.css';
//import './UserProfileBody.js';



function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}

function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}

//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class SignUpBody extends Component {

  
  constructor(props) {
    super(props);
    //function bindings
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    //fields
    this.state = {
      isLoggedIn: false, 
      first: '',
      last: '',
      username: '',
      email: '',
      password: '',
    };
  }

  //Write methods for this component here
  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    //alert('Information submitted: ' + this.state.first + ' '+ this.state.username + ', '+ this.state.username + ', '+ this.state.email);
    const first = this.state.first;
    const last = this.state.last;
    const user = this.state.username;
    const email = this.state.email;
    const password = this.state.password;

    //Successful posts and gets with jquery!
    $.post("http://localhost:9000/login",{first: first, last: last, username: user, email: email, password: password}, function(data){
           
                alert("login success");
            
    });

    //move this to another page
    $.get("http://localhost:9000/login",{email: email, password: password}, function(data, status){
            
          alert("Response from server was ["+status+"] and the data:  " + data);
          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);
              //use json.parse to make it into a js object - might need this in server!
    });

    event.preventDefault();
  }

  render() {
    
    const isLoggedIn = this.state.isLoggedIn;

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />

          <form onSubmit={this.handleSubmit}>
          <label>
            First Name: 
            <input type="text" name="first" first={this.state.first} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Last Name: 
            <input type="text" name="last" last={this.state.last} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            Username: 
            <input type="text" name="username" username={this.state.username} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            email: 
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <br />
          <label>
            password: 
            <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          </label>
          <br />
          <input type="submit" name="Submit" />
        </form>

      </div>
    );
  

  }
}

export default SignUpBody;


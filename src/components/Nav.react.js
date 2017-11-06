import React, { Component } from 'react';
//import FacebookProvider, { Login } from 'react-facebook';

import {Navbar, Nav, NavDropdown,MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';


//import *  as ReactBootstrap from 'react-bootstrap';
/*let Navbar = require("react-bootstrap/lib/Navbar");
let NavItem = require("react-bootstrap/lib/NavItem");
let Nav = require ("react-bootstrap/lib/Nav");
let NavDropdown = require("react-bootstrap/lib/NavDropdown");
let MenuItem = require("react-bootstrap/lib/MenuItem");
let FormGroup = require("react-bootstrap/lib/FormGroup");
let FormControl = require("react-bootstrap/lib/FormControl");
let Button = require("react-bootstrap/lib/Button");*/

 //<fb:login-button scope="public_profile,email,user_about_me,user_location" onlogin="checkLoginState();"> Login
        //</fb:login-button>

function LoginButton() {
  return (
    <div>
      <Nav>

           



        <MenuItem eventKey={4} href="/User">Login</MenuItem>
        <MenuItem eventKey={4.1} href="/SignUp">Sign Up</MenuItem>
      </Nav>
    </div>
  );
}

function LogoutButton() {
  return (
    <div>
      <Nav>
        <MenuItem eventKey={4.3} href="/User">My Profile</MenuItem>
        <MenuItem eventKey={4.2} href="/SignOut">Logout</MenuItem>
      </Nav>
    </div>
  );
}

class Navigationmenu extends Component {


  responseFacebook(response) {
      console.log(response);
    }
  handleError = (error) => {
    this.setState({ error });
  }

  render() {

    let isLoggedIn = (getCookie("loggedin") === "true") ? true:false;
    console.log("isLoggedIn: "+ isLoggedIn);
    let NAVPORTAL = null;

    //if logged in, display mini welcome on nav bar   
    if (isLoggedIn) {
      NAVPORTAL =  <LogoutButton />;
    } 
    //otherwise prompt the user to sign in or login
    else {
      NAVPORTAL = <LoginButton  />;
    }
    

    return (
      <div className="navbar">
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>

            <Navbar.Brand>  
              <a href="/"> Leaderboards </a>
            </Navbar.Brand>
            
            <Navbar.Toggle />

          </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <MenuItem eventKey={1} href="/Browse">Browse</MenuItem>
            <MenuItem eventKey={2} href="/LeaderboardMain">My Boards</MenuItem>
            <NavDropdown eventKey={3} title="Docs" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}  >APIs</MenuItem>
              <MenuItem eventKey={3.2}>More APIs</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Other APIS</MenuItem>
            </NavDropdown>
          </Nav>

          <Nav pullRight>
            {NAVPORTAL}
          </Nav>

          <Navbar.Form pullRight>
            <FormGroup>
              <FormControl type="text" placeholder="Search" />
            </FormGroup>
            {' '}
            <Button type="submit">Submit</Button>
          </Navbar.Form>

            

          

        </Navbar.Collapse>
      </Navbar> 

      </div>
    );
  }
}

export default Navigationmenu;


//return value from the cookie
function getCookie(cname) {
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
    return "";
}
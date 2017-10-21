import React, { Component } from 'react';
//import Request from 'react-http-request';
import { findDOMNode } from 'react-dom';

import axios from 'axios';
import $ from 'jquery';


//import {Grid, Row, Col, Thumbnail, Button, Carousel, Media} from 'react-bootstrap';
import './UserProfileBody.css';
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
class UserProfileBody extends Component {

  

   
  render() {


  
    return (
      


      <div className="class" onLoad={this.handleLoad}>


     
    

       <div class="col-lg-6 col-sm-6">
        <div class="card hovercard">
            <div class="card-background">
                <img class="card-bkimg" alt="" src="http://lorempixel.com/100/100/people/9/"/>
            </div>
            <div class="useravatar">
                <img alt="" src="http://lorempixel.com/100/100/people/9/"/>
            </div>
            <div class="card-info"> <span class="card-title">Pamela Anderson</span>

            </div>
        </div>
        <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
            <div class="btn-group" role="group">
                <button type="button" id="stars" class="btn btn-primary" href="#tab1" data-toggle="tab"><span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                    <div class="hidden-xs">Stars</div>
                </button>
            </div>
            <div class="btn-group" role="group">
                <button type="button" id="favorites" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
                    <div class="hidden-xs">Favorites</div>
                </button>
            </div>
            <div class="btn-group" role="group">
                <button type="button" id="following" class="btn btn-default" href="#tab3" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                    <div class="hidden-xs">Following</div>
                </button>
            </div>
        </div>

            <div class="well">
          <div class="tab-content">
            <div class="tab-pane fade in active" id="tab1">
              <h3>This is tab 1</h3>
            </div>
            <div class="tab-pane fade in" id="tab2">
              <h3>This is tab 2</h3>
            </div>s
            <div class="tab-pane fade in" id="tab3">
              <h3>This is tab 3</h3>
            </div>
          </div>
        </div>
    
    </div>

      </div>
    );
  }
}

export default UserProfileBody;


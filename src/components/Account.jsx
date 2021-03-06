//*** PLEASE NOTE - this page isnt built with react-bootstrap - the rest of website is, we should probably convert it over. This is a place holder 

import React, { Component } from 'react';
import $ from 'jquery';
//import Utils from './Utilities'
//import {Grid, Row, Col, Thumbnail, Button, Carousel, Media} from 'react-bootstrap';
//import styles from './UserProfileBody.css';


//This file is just using the regular bootstrap css file. Not fancy pants react-bootstraps here
class Account extends Component {

  constructor(props) {
    super(props);
    //function bindings
    this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);

    //fields
    this.state = {
      //get token, use it to grab information
      token: getCookie('token'),
      userID: getCookie('userID'),
      
      first: '',
      last: '',
      username: '',
      email: '',
      boards: [],
    };
  }
    //Write methods for this component here
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

 
  //Probably want to fetch this user's board info here - too much info to keep in a cookie
  //-Create a token and assign it to a user - have them send that token as identification,
  //-if it matches the token in the database for that user, then authenticate them.
  componentWillMount() {
    let token = getCookie("token");
    let token2 = this.state.token;
    console.log("Token 1: "+token+" Token 2: "+token2);


    $.get("http://localhost:9000/login",{token: token}, (data, status) => {
          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
          //convert response to js object
          const convertedData = JSON.parse(data);
          console.log("Found data for : "+ convertedData.username);

          //write to our cookie!
          //updateCookie(convertedData);
          //console.log(document.cookie);

          //Updating component state values
          this.setState({first: convertedData.firstname});
          this.setState({last: convertedData.lastname});
          this.setState({username: convertedData.username});
          this.setState({email: convertedData.email});
          this.setState({boards: convertedData.boards}); //this might not be OK - might wanna just save boards in the cookie
    });
  }


  render() {
    let USERNAME = getCookie("username");
    let FIRSTNAME = getCookie("firstname");
    let LASTNAME = getCookie("lastname");
    let EMAIL = getCookie("email");

    let CITY = getCookie("city");
    let STATE = getCookie("state");
    let COUNTRY = getCookie("country");

    let BOARDS = this.state.boards; //will have to be from cookie -> and then all of this will have to be pulled from DB

      return (
        <div className="class" >
          <div class="col-lg-12 col-sm-12">
            <div class="card hovercard">
              <div class="card-background">
                <img class="card-bkimg" alt="" src="http://lorempixel.com/100/100/people/9/"/>
              </div>
              <div class="useravatar">
                <img alt="" src="http://lorempixel.com/100/100/people/9/"/>
              </div>
              <div class="card-info"> <span class="card-title">{USERNAME}</span>

              </div>
            </div>
            <div class="btn-pref btn-group btn-group-justified btn-group-lg" role="group" aria-label="...">
              <div class="btn-group" role="group">
                <button type="button" id="stars" class="btn btn-primary" href="#tab1" data-toggle="tab"><span class="glyphicon glyphicon-star" aria-hidden="true"></span>
                  <div class="hidden-xs">Info</div>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button type="button" id="favorites" class="btn btn-default" href="#tab2" data-toggle="tab"><span class="glyphicon glyphicon-heart" aria-hidden="true"></span>
                  <div class="hidden-xs">Boards</div>
                </button>
              </div>
              <div class="btn-group" role="group">
                <button type="button" id="following" class="btn btn-default" href="#tab3" data-toggle="tab"><span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                  <div class="hidden-xs">Friends</div>
                </button>
              </div>
            </div>

            <div class="well">
              <div class="tab-content">
                <div class="tab-pane fade in active" id="tab1">
                 <h3>Name: {FIRSTNAME} {LASTNAME} </h3>
                 <br />
                 <h3>Email: {EMAIL} </h3>
                 <br />
                 <h4> Location:   {CITY}, {STATE}, {COUNTRY} </h4>
                 <br />
                 <h4> Boards: {BOARDS} </h4>
                </div>
                <div class="tab-pane fade in" id="tab2">
                  <h3>This is tab 2</h3>
                </div>
                <div class="tab-pane fade in" id="tab3">
                  <h3>This is tab 3</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default Account;





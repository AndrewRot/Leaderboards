import React, { Component } from 'react';
import {Grid, Col, Thumbnail, Button,FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import $ from 'jquery';
import './css/BrowseBody.css';
import Modal from 'react-modal';


function Square(props) {
  return (
    <Col xs={6} md={4}>
		<Thumbnail src="/assets/thumbnail.png" alt="242x200">
        	<h3>Company {props.value}</h3>
			 <p>Description</p>
		  	<p>
		  	 	<Button bsStyle="primary" block>Button</Button>&nbsp;
		  	</p>
		 </Thumbnail>
	</Col>
  );
}


class BrowseBody extends Component {

	constructor(props) {
    super(props);
    //function bindings
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);


    this.state = {
      boards: [ ],
      boardClicked : '',
      user: '',
      email: '',
      username: '',
      password: '',
      modalIsOpen: false,

      //info to pass to model when we connect to an app
      boardID: 0,
      boardName: '',
      boardImageURL: '', //set this to generic logo incase it's not found.
    };
  }



  //After we pull company profiles form the database, pass in the information to each square as a prop
  renderSquare(i) {
     return <Square value={i} />;
  }

  
  openModal(boardID, boardName, boardImageURL,  event) {
    this.setState({modalIsOpen: true});
    console.log("Model is open: "+this.state.modalIsOpen);

    console.log("BoardID: "+boardID);
    console.log("BoardName: "+boardName);
    console.log("boardImageURL: "+boardImageURL);



    //Update our state variables, so we can populate the model with company specific information
    this.setState({boardID: boardID});
    this.setState({boardName: boardName});
    this.setState({boardImageURL: boardImageURL});
  }
  afterOpenModal() {
    this.subtitle.style.color = '#f00';    // references are now sync'd and can be accessed.
  }
  closeModal() {
    this.setState({modalIsOpen: false});
  }


  //need to query the listofboards collection here, store the names in an array, which we will then map
  componentWillMount() {
    console.log("Fetching boards...");
     $.get("http://localhost:9000/fetchboards",{}, (data, status) => {
          //data returned is an array named list - contains boards form the DB
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
          //Returned DATA: [{"boardID":1,"name":"Fantasy Soccer","description":"Fantasy soccer, goals, assists, other stats","imgURL":"/images/fantasysoccer.png"},{"boardID":2,"name":"Netflix","description":"Netflix movies watched","imgURL":"/images/netflix.png"}]
          //convert response to js object
          const convertedData = JSON.parse(data);
          console.log("Boards converted: "+ convertedData);

          //Updating component state values
          this.setState({boards: convertedData});
    });
     console.log("Boards found...");
  }


  //Handle signing into a respective boards API
  handleSubmit(event) {

    //call the method to call the api 
    const userID = getCookie("userID"); //*** DANGER **** This is a vulnerability - a user that changes his cookie can update someone else's scores!
    const email = this.state.email;
    const password = this.state.password;
    const boardID = this.state.boardID;
    const url = "http://localhost:9000/connectto/"+boardID;

    $.get(url,{userID: userID, email: email, password: password}, function(data){
        alert("Logging into "+email+"'s account on Github");
        //reroute the user to the board
        //update the content of the modal "successfully signed into xxx"
        //"would you like to view your ranking?"
    });




    /* THEN post the updates to the database **** need to add authentication token for respective websites
    const userid = getCookie("userid");//this.state.user; ------ Not secure at all. do a get form the DB to get userinfo

    const boardClicked = event.target.name;
    console.log("userid: "+ userid + " boardClicked: "+boardClicked);

    //Successful posts and gets with jquery! WORKING
    $.post("http://localhost:9000/followboard",{ userid: userid, board: boardClicked}, function(data){
        alert("You added "+data+" to "+userid+" profile! : ");
        //*****navigate the user to this board now!
    });

*/
    //***** Update this later so that it goes to the second page of sign up stuff
    //window.location="/Browse"; //reroute user to browse leaderboards -
    event.preventDefault();
  }

  //** move this to generic folder to be referenced accross files. Used for validating form input
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
 

  render() {

    let boards = this.state.boards;

    return (
      <div className="class">

      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          
          contentLabel="Example Modal"  >

          <div>
            <h2 ref={subtitle => this.subtitle = subtitle}>Sign in with {this.state.boardName}</h2>
          
            <Thumbnail class="modal"  >
           
              <form name={this.state.boardID} onSubmit={this.handleSubmit} class="form"  >
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
               
                <Button block bsSize="large"  type="submit" >
                  Login
                </Button>
              </form>
            
            </Thumbnail>
           </div>
            
        </Modal>



          <Grid>
          {boards.map(function(board, i){
            let boardID = board.boardID;
            let boardName = board.name;
            let boardImageURL = board.imgURL;
            //create a variable set to a function - this allows use to pass multiple vars to the method
            let boundClick = this.openModal.bind(this, boardID, boardName, boardImageURL); 
            return (
              <Col xs={6} md={4}>
                <Thumbnail src={board.imgURL} alt="242x200" >
                
                  <h3>{board.name}</h3>
                     <p>{board.description}</p>
                      <p>
                        <Button bsStyle="primary" name={board.boardID} block onClick={boundClick}>Connect</Button>
                      </p>
                   </Thumbnail>
                </Col>
                )
              }, this)}
          </Grid>

      </div>
    );
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

export default BrowseBody;



/*
alt="242x200"
disabled={!this.validateForm()}

src={this.state.boardImageURL}
https://3fybkfrr10x3tgp41p45lr3a-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/flix.png
<option value={name}>{name}</option>


<FormGroup controlId="city" bsSize="large" >
            <ControlLabel>City</ControlLabel>
            <FormControl componentClass="select" name="city"  value={this.state.city} onChange={this.handleChange}>
            </FormControl>
          </FormGroup>
<div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>

*/

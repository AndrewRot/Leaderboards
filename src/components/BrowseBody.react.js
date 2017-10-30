import React, { Component } from 'react';
import {Grid, Row, Col,Image, Thumbnail, Button,FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import $ from 'jquery';

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
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      boards: [ ],
      boardClicked : '',
      user: '',
    };
  }



  //After we pull company profiles form the database, pass in the information to each square as a prop
  renderSquare(i) {
     return <Square value={i} />;
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


  //Handle s=clicking the follow board button for each respective board
  handleSubmit(event) {
    const userid = getCookie("userid");//this.state.user; ------ Not secure at all. do a get form the DB to get userinfo

    const boardClicked = event.target.name;
    console.log("userid: "+ userid + " boardClicked: "+boardClicked);

    //Successful posts and gets with jquery!
    $.post("http://localhost:9000/followboard",{ userid: userid, board: boardClicked}, function(data){
        alert("You added "+data+" to "+userid+" profile! : ");
        //*****navigate the user to this board now!
    });
    //***** Update this later so that it goes to the second page of sign up stuff
    //window.location="/Browse"; //reroute user to browse leaderboards -
    event.preventDefault();
  }

  render() {

    let boards = this.state.boards;

    return (
      <div className="class">

          <Grid>
          {boards.map(function(board, i){
            //const logo = require({board.imgURL});
            return (
              <Col xs={6} md={4}>
                <Thumbnail src='https://3fybkfrr10x3tgp41p45lr3a-wpengine.netdna-ssl.com/wp-content/uploads/2016/01/flix.png' alt="242x200" >
                
                  <h3>Company: {board.name}</h3>
                     <p>{board.description}</p>
                      <p>
                        <Button bsStyle="primary" name={board.boardID} block onClick={this.handleSubmit}>Connect</Button>&nbsp;
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
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
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

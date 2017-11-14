import React, { Component } from 'react';
import {Button, Grid, Row, Col, ControlLabel, FormGroup, FormControl, Table, Panel} from 'react-bootstrap';
import $ from 'jquery';
//import Utils from './Utilities' //not working
//import Utils from './/utils/Utilities' - ideally something like this is better - but struggling



function BoardRow(props) {
  return (
    <td>X {props.value} </td>
  );
}

function BoardHeading(props) {
  return (
    <th>{props.value}</th>
  );
}


class LeaderboardBody extends Component {

	constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = { 
      title: 'Default',
      company: '', //this is the name of the collection we want to query

      //statType: 0, //used to hold the scoreID of the statType drop down not using anymore?
      statTime: 'All Time',
      statLocation: 'Global',
      scoreID: 1,

      sortedStatType: 'score', //update this value after the search returns,

      userid: getCookie('userid'),
      email: getCookie('email'),
      password: getCookie('password'),

      boardID: 1,
      boards: [],
      statTypes: [], //fill this with the boardID's statTypes

      rows: [{ userid: 1, score: 0,  userinfo: [{ username: ''}] }], //initialize this array with the proper structure

     };
  }



  //After we pull company profiles form the database, pass in the information to each square as a prop
  //This is where we pass the individual scores/values of each player/person
  renderBoardRow(i) {
     return <BoardRow value={i} />;
  }

  //Here we will pass what the category is for the leaderboard headings
  renderBoardHeading(i) {
     return <BoardHeading value={i} />;
  }

   handleChange(event) {
    console.log("Updating: "+event.target.name+" to be: "+event.target.value );
    this.setState({ [event.target.name]: event.target.value }, this.fetchBoardStats); 
  }

  //if the screen has been updated, check to update the board stats
  fetchBoardStats() {
    let boardID = this.state.boardID;

    //if it is the boardID that changed, we need to get this board's stats
    $.get("http://localhost:9000/getBoardStats",{boardID: boardID}, (data, status) => {
          //console.log("Response from server was ["+status+"] and the data:  " + data);
          //returns boardID, scoreID, scoreName
          const convertedData = JSON.parse(data);     //convert response to js object
          //populate our statTypes array with the returned data array
          this.setState({statTypes: convertedData}) //boardID, scoreID, scoreName
          //this.setState({scoreID: convertedData[0].scoreID}) //update the scoreID
    });
  }

 
  //Handle what happens when a user tries to log in
  handleSubmit(event) {
    const boardID = this.state.boardID;
    const scoreID = this.state.scoreID;
    const statTime = this.state.statTime;
    const statLocation = this.state.statLocation;
    const userID = getCookie('userID');
    const city = getCookie('city');
    const state = getCookie('state');
    const country = getCookie('country');
    //console.log("boardID: "+boardID+ " scoreID: "+scoreID+ " statType: "+statType+" statTime: "+statTime+" statLocation: "+statLocation+" userID: "+userID + " city: "+city+" state: "+state+" country: "+country);

    $.get("http://localhost:9000/leaderboard",{boardID: boardID, scoreID: scoreID, statTime: statTime, statLocation: statLocation, userID: userID, city: city, state: state, country: country}, (data, status) => {
          //console.log("Response from server was ["+status+"] and the data:  " + data);
          
          const convertedData = JSON.parse(data); //convert response to js object
       
          //populate our rows array with the returned data array
          this.setState({rows: convertedData})
    });
    
    event.preventDefault();
  }

  //Load up the user's boards at the beginning
  componentWillMount() {
    const userid = getCookie("userID"); //convert to using token
    console.log("userID: "+userid)

    $.get("http://localhost:9000/getmyboardinfo",{userid: userid}, (data, status) => {
          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
          //convert response to js object
          const convertedData = JSON.parse(data);
          //console.log("Found data for : "+ convertedData);

          //Updating component state values
          this.setState({boards: convertedData});

          //update the current company/board with the first from the list
          this.setState({company: convertedData[0].name}) //make this change when drop down changes
          //this.setState({scoreID: convertedData[0].scoreID})
          this.setState({boardID: convertedData[0].boardID}, this.fetchBoardStats) //use fetchBoardStats as a callback when boardID loads.
    });

    //we may also wanna do a query here to get the first board's associated scores - join with scoreboardlinker
     console.log("Boards found...");
  }


  //queries will be based off of the selected filters.. probably should omit a bunchof these and just start with basics.
  render() {

    let boards = this.state.boards;
    let statTypes = this.state.statTypes; //This has to update whenever the boardID is updated

    let rows = this.state.rows;
    let scoreID = this.state.scoreID; //might not need...
    let sortedStatType = this.state.sortedStatType;

    //we want to populate the form with the database fields
    return (
      <div className="class">

      <Grid>
       <Row className="show-grid">
         <Col sm={2} md={3}>
          <Panel header="Filters">
            See how you rank against friends, rivals, people in your area or around the globe!
            <hr />

            <form onSubmit={this.handleSubmit}  >

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Board</ControlLabel>
              <FormControl componentClass="select" placeholder="Board" name="boardID" value={this.state.boardID} onChange={this.handleChange}>
                {boards.map(function(board, i){
                  return (<option value={board.boardID}>{board.name}</option>)
                  })}
              </FormControl>
            </FormGroup>
           

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Stat</ControlLabel>
              <FormControl componentClass="select" placeholder="Score" name="scoreID" value={this.state.scoreID} onChange={this.handleChange}>
                 {statTypes.map(function(stat, i){
                  return (<option value={stat.scoreID}>{stat.scoreName}</option>)
                  })}

              
              </FormControl>
            </FormGroup>

             <FormGroup controlId="formControlsSelect">
              <ControlLabel>Time</ControlLabel>
              <FormControl componentClass="select" placeholder="All Time" name="statTime" value={this.state.statTime} onChange={this.handleChange}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="All Time">All Time</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Area</ControlLabel>
              <FormControl componentClass="select" placeholder="Global" name="statLocation" value={this.state.statLocation} onChange={this.handleChange}>
                <option value="City">City</option>
                <option value="State">State</option>
                <option value="Country">Country</option>
                <option value="Global">Global</option>
              </FormControl>
            </FormGroup>

            <Button block bsSize="default" type="submit" >
              Update Search
            </Button>

          </form>

          </Panel>
          
         </Col>


         <Col sm={10} md={9}>
          
          <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              {this.renderBoardHeading("Name")}
              {this.renderBoardHeading("Username")}
              {this.renderBoardHeading("Score")}
              {this.renderBoardHeading("City")}
              {this.renderBoardHeading("State")}
              {this.renderBoardHeading("Country")}
              {this.renderBoardHeading("Date")}
            </tr>
          </thead>
          <tbody>
          
           {rows.map(function(row, i){
              return (
              <tr> 
                  <td>{i+1}</td>
                  <td>{row.firstName} {row.lastName} </td>
                  <td>{row.username} </td>
                  <td>{row.score} </td>
                  <td> {row.city} </td>
                  <td> {row.state} </td>
                  <td> {row.country} </td>
                  <td> {row.time} </td>
              </tr>)

              })}

          </tbody>
        </Table>

        </Col>
       </Row>
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

export default LeaderboardBody;


//Might just have to move this outside of this component, stand alone function?
//This wont last for long, eventually do an indidvidal modular function. This is too custom for this stage of the app. Or make it so we pass it an array/dictionary to update the cookie fields
//write to the actual cookie
/*function updateCookie(convertedData){
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000)); //expires in 1 day  [days * hours * minutes * seconds * milli secs]
    var expires = "expires="+ d.toUTCString();
    document.cookie = "userID=" + convertedData.userID;
    document.cookie = "firstname=" + convertedData.firstName;
    document.cookie = "lastname=" + convertedData.lastName;
    document.cookie = "username=" + convertedData.username;
    document.cookie = "email=" + convertedData.email ;
    document.cookie = "city=" + convertedData.city ;
    document.cookie = "state=" + convertedData.state ;
    document.cookie = "country=" + convertedData.country ;
    //document.cookie = "password=" + convertedData.password ;
    document.cookie = "loggedin=true";
    document.cookie = expires;
    document.cookie = "path=/";
}*/


/*
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



<option value="score">Score</option>
                <option value="goals">Goals</option>
                <option value="assists">Assists</option>
                <option value="gamesplayed">Games Played</option>


{rows.map(function(r, i){
              return 
                <tr>
                  <td>{i+1}</td>
                  {this.renderBoardRow({r.userid})}
                  {this.renderBoardRow({r.score})}
                  </tr>
                <tr>
              })}

            <tr>
              <td>1</td>
              {this.renderBoardRow(FIRSTPLACENAME)}
              {this.renderBoardRow(FIRSTPLACESCORE)}
            </tr>
            <tr>
              <td>2</td>
              {this.renderBoardRow(SECONDPLACENAME)}
              {this.renderBoardRow(SECONDPLACESCORE)}
            </tr>
            <tr>
              <td>3</td>
              {this.renderBoardRow(THIRDPLACENAME)}
              {this.renderBoardRow(THIRDPLACESCORE)}
            </tr>*/

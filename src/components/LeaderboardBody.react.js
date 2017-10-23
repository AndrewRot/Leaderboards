import React, { Component } from 'react';
import {Button, Grid, Row, Col, ControlLabel, FormGroup, FormControl, Table, Panel} from 'react-bootstrap';
import $ from 'jquery';


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
      company: 'testboard', //this is the name of the collection we want to query
      //This shit will have to be encapsulated inside of an array or data container
      statType: 'score', //used to hold teh value of the current drop down value
      sortedStatType: 'score', //update this value after the search returns,

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
    this.setState({ [event.target.name]: event.target.value });
  }
 
  //Handle what happens when a user tries to log in
  handleSubmit(event) {
    const company = this.state.company;
    const stat = this.state.statType;

    //will have to update this URL later (or just /login ?)
    $.get("http://localhost:9000/leaderboard",{company: company, stat: stat}, (data, status) => {

          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
          //**** I should check to see what the status code is, if it fails we wanna stop here

          //convert response to js object
          const convertedData = JSON.parse(data);
          //returns data in the following strucutre:
          /*
            [{"_id":"59ee199418f266e07b239d17",
              "userid":1,
              "score":500,
              "company":"testcompany",
              "userinfo":[{"_id":"59edff793ddc65ba3a211e06",
                           "userid":1,
                           "first":"Andrew",
                           "last":"Rottier",
                           "username":"OJoj",
                           "email":"andrewrottier95@gmail.com",
                           "password":"password",
                           "city":"Boston",
                           "zip":"01609",
                           "state":"MA",
                           "country":"United States"}]}, ...
          */
          console.log("userid: "+convertedData[0].userid + " score is "+convertedData[0].score + " username is "+ convertedData[0].userinfo[0].username)
          console.log("userid: "+convertedData[1].userid + " score is "+convertedData[1].score + " username is "+ convertedData[1].userinfo[0].username)
          console.log("userid: "+convertedData[2].userid + " score is "+convertedData[2].score + " username is "+ convertedData[2].userinfo[0].username) 
          
          //Updating component state values *** UPDATE TO A LOOP

          //populate our rows array with the returned data array
          this.setState({rows: convertedData})
      
 

    });
    //refresh the page maybe to load the new query info?
    //window.location="/User";

    //update the sorted state type, this cahnges our tables after the query is done
    this.setState({sortedStatType: stat});
    event.preventDefault();

  }


  //queries will be based off of the selected filters.. probably should omit a bunchof these and just start with basics.
  render() {

    let rows = this.state.rows;
    let statType = this.state.statType;
    let sortedStatType = this.state.sortedStatType;
    //rows.push(EmptyRow);


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
              <ControlLabel>Stat</ControlLabel>
              <FormControl componentClass="select" placeholder="Score" name="statType" value={this.state.statType} onChange={this.handleChange}>
                <option value="score">Score</option>
                <option value="goals">Goals</option>
                <option value="assists">Assists</option>
                <option value="gamesplayed">Games Played</option>
              </FormControl>
            </FormGroup>

             <FormGroup controlId="formControlsSelect">
              <ControlLabel>Time</ControlLabel>
              <FormControl componentClass="select" placeholder="Daily">
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="All Time">All Time</option>
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Area</ControlLabel>
              <FormControl componentClass="select" placeholder="City">
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
            </tr>
          </thead>
          <tbody>
          
           {rows.map(function(row, i){
              return (
              <tr> 
                  <td>{i+1}</td>
                  <td>{row.userinfo[0].first} {row.userinfo[0].last} </td>
                  <td>{row.userinfo[0].username} </td>
                  <td>{row[sortedStatType]} </td>
                  <td> {row.userinfo[0].city} </td>
                  <td> {row.userinfo[0].state} </td>
                  <td> {row.userinfo[0].country} </td>
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

export default LeaderboardBody;


/*



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

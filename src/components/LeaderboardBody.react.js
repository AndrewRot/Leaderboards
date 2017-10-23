import React, { Component } from 'react';
import {Button, Grid, Row, Col, ControlLabel, FormGroup, FormControl, Table, Panel} from 'react-bootstrap';
import $ from 'jquery';


function BoardRow(props) {
  return (
    <td>{props.value} </td>
  );
}

function BoardHeading(props) {
  return (
    <th>heading {props.value}</th>
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
      firstPlaceName: 'first place name',
      firstPlaceScore: 'first place score',
      secondPlaceName: 'second place name',
      secondPlaceScore: 'second place score',
      thirdPlaceName: 'third place name',
      thirdPlaceScore: 'third place score',

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

    //will have to update this URL later (or just /login ?)
    $.get("http://localhost:9000/leaderboard",{company: company}, (data, status) => {
          //alert("Response from server was ["+status+"] and the data:  " + data);
          //now assign this to the proper variables in react component
          console.log("Response from server was ["+status+"] and the data:  " + data);
          
          //**** I should check to see what the status code is, if it fails we wanna stop here

          //convert response to js object
          const convertedData = JSON.parse(data);
          console.log("userid: "+convertedData[0].userid + " score is "+convertedData[0].score)
          console.log("userid: "+convertedData[1].userid + " score is "+convertedData[1].score)
          console.log("userid: "+convertedData[2].userid + " score is "+convertedData[2].score)
          
          //Updating component state values *** UPDATE TO A LOOP
          this.setState({firstPlaceName: convertedData[0].userid});
          this.setState({firstPlaceScore: convertedData[0].score});

          this.setState({secondPlaceName: convertedData[1].userid});
          this.setState({secondPlaceScore: convertedData[1].score});

          this.setState({thirdPlaceName: convertedData[2].userid});
          this.setState({thirdPlaceScore: convertedData[2].score});
 

    });
    //refresh the page maybe to load the new query info?
    //window.location="/User";
    event.preventDefault();

  }


  //queries will be based off of the selected filters.. probably should omit a bunchof these and just start with basics.
  render() {

    //turn this into loops
    let FIRSTPLACENAME = this.state.firstPlaceName;
    let FIRSTPLACESCORE = this.state.firstPlaceScore;

    let SECONDPLACENAME = this.state.secondPlaceName;
    let SECONDPLACESCORE = this.state.secondPlaceScore;

    let THIRDPLACENAME = this.state.thirdPlaceName;
    let THIRDPLACESCORE = this.state.thirdPlaceScore;


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
              {this.renderBoardHeading("(User id)")}
              {this.renderBoardHeading("(score)")}
              {this.renderBoardHeading("Z")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {this.renderBoardRow(FIRSTPLACENAME)}
              {this.renderBoardRow(FIRSTPLACESCORE)}
              {this.renderBoardRow(2)}
            </tr>
            <tr>
              <td>2</td>
              {this.renderBoardRow(SECONDPLACENAME)}
              {this.renderBoardRow(SECONDPLACESCORE)}
              {this.renderBoardRow(5)}
            </tr>
            <tr>
              <td>3</td>
              {this.renderBoardRow(THIRDPLACENAME)}
              {this.renderBoardRow(THIRDPLACESCORE)}
              {this.renderBoardRow(8)}
            </tr>
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


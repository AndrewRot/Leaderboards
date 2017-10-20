import React, { Component } from 'react';
import {Grid, Row, Col, ControlLabel, FormGroup, FormControl, Table, Panel} from 'react-bootstrap';


function BoardRow(props) {
  return (
    <td>Table cell {props.value}</td>
  );
}

function BoardHeading(props) {
  return (
    <th>Table heading {props.value}</th>
  );
}


class LeaderboardBody extends Component {

	constructor(props) {
    super(props);

    this.state = { title: 'Default' };
  }

  //After we pull company profiles form the database, pass in the information to each square as a prop
  //This is where we pass the individual scores/values of each player/person
  renderBoardRow(i) {
     return <BoardRow value={i} />;
  }

  //Here we will pass what the category is for the leaderboard headings
  renderBoardHeading(i) {
     return <BoardRow value={i} />;
  }


  //queries will be based off of the selected filters.. probably should omit a bunchof these and just start with basics.
  render() {
    return (
      <div className="class">

      <Grid>
       <Row className="show-grid">
         <Col sm={2} md={3}>
          <Panel header="Filters">
            See how you rank against friends, rivals, people in your area or around the globe!
            <hr />
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

          </Panel>
          
         </Col>


         <Col sm={10} md={9}>
          
          <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>#</th>
              {this.renderBoardHeading("X")}
              {this.renderBoardHeading("Y")}
              {this.renderBoardHeading("Z")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              {this.renderBoardRow(0)}
              {this.renderBoardRow(1)}
              {this.renderBoardRow(2)}
            </tr>
            <tr>
              <td>2</td>
              {this.renderBoardRow(3)}
              {this.renderBoardRow(4)}
              {this.renderBoardRow(5)}
            </tr>
            <tr>
              <td>3</td>
              {this.renderBoardRow(6)}
              {this.renderBoardRow(7)}
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


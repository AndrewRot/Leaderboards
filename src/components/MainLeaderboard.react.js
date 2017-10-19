import React, { Component } from 'react';
import {Grid, Row, Col, Thumbnail, Button, Table} from 'react-bootstrap';


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
/*
<Col xs={6} md={4}>
    <Thumbnail src="/assets/thumbnail.png" alt="242x200">
          <h3>Company {props.value}</h3>
       <p>Description</p>
        <p>
          <Button bsStyle="primary" block>Button</Button>&nbsp;
        </p>
     </Thumbnail>
  </Col>
*/

class MainLeaderboard extends Component {

	constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
    };
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


  render() {
    return (
      <div className="class">



    <Table responsive>
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


      </div>
    );
  }
}

export default MainLeaderboard;

/*

      <Grid>
       <Row>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </Row>
    <Row>
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </Row>
        
    </Grid>
*/

import React, { Component } from 'react';
import {Grid, Row, Col, Thumbnail, Button} from 'react-bootstrap';


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


class Main extends Component {

	constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
    };
  }



  //After we pull company profiles form the database, pass in the information to each square as a prop
  renderSquare(i) {
     return <Square value={i} />;
  }


  render() {
    return (
      <div className="class">

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
        <Row>
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        
      		</Row>
		</Grid>

      </div>
    );
  }
}

export default Main;



/*
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

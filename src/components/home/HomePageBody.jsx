import React, { Component } from 'react';
import { Row, Grid, Col, Thumbnail, Button, Carousel, Media} from 'react-bootstrap';
import mainpic from '../images/leadertemp.png';
import './css/HomePageBody.css';

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


class HomePageBody extends Component {


  //After we pull company profiles form the database, pass in the information to each square as a prop
  renderSquare(i) {
     return <Square value={i} />;
  }


  render() {
    return (
      <div className="class">


      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-3">Welcome to Leaderboards!</h1>
          <p class="lead">Home to hundreds to boards for apps you use every day. Get rewarded for the apps you're already using!</p>
        </div>
      </div>

      <hr />

      <Carousel responsive>
        <Carousel.Item>
          <img class="img-slider"  alt="900x500"  src={mainpic}/>
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img class="img-slider" alt="900x500" src={mainpic}/>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img class="img-slider" alt="900x500" src={mainpic}/>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <hr />

      <Media>
       <Media.Left>
          <img class="media" src="/assets/thumbnail.png" alt="blank"/>
        </Media.Left>
        <Media.Body>
          <Media.Heading>Media Heading</Media.Heading>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
        </Media.Body>
      </Media>

      <Media>
        <Media.Body>
          <Media.Heading>Media Heading</Media.Heading>
          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
        </Media.Body>
         <Media.Right>
          <img class="media" src="/assets/thumbnail.png" alt="blank"/>
        </Media.Right>
      </Media>

        <Grid>
          <Row className="show-grid">
            <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
            <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

export default HomePageBody;


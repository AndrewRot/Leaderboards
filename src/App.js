import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Main from './components/Main.react.js';
import Navigationmenu from './components/Nav.react.js';
//import { Button } from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigationmenu />
        
        <Main />
      </div>


    );
  }
}

export default App;


/*


        <img src={logo} className="App-logo" alt="logo" />

<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
         <Button
                bsStyle="success"
                bsSize="large"
                href="http://react-bootstrap.github.io/components.html"
                target="_blank">
                View React Bootstrap Docs
              </Button>
*/
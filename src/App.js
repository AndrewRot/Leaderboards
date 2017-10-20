/** Created by Andrew Rottier
  * This is where the homepage content should go
  */


import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import HomePageBody from './components/HomePageBody.react.js';
import Navigationmenu from './components/Nav.react.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigationmenu />
        
        <HomePageBody />
      </div>
    );
  }
}



export default App;

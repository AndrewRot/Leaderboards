import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
//import { Button } from 'react-bootstrap';
import LeaderboardBody from './LeaderboardBody.react.js';
import Navigationmenu from './Nav.react.js';


//Incorperate different things to make these pages more complex
class MainLeaderboard extends Component {
  render() {
    return (
       <div className="App">
        <Navigationmenu />
        <h1> Leaderboard </h1>
        
        <LeaderboardBody />
      </div>

    );
  }
}

export default MainLeaderboard;




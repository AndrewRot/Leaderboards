import React, { Component } from 'react';

import LeaderboardBody from './LeaderboardBody';
import Navigationmenu from '../Nav';


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




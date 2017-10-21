import React from 'react';
import { Router, Route } from 'react-router';

//Looks like we only need to import the main file constrictors here
import App from './App';
import MainBrowse from './components/MainBrowse.react';
import MainLeaderboard from './components/MainLeaderboard.react';
import MainUserProfile from './components/MainUserProfile.react';
import MainSignUp from './components/MainSignUp.react';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/LeaderboardMain" component={MainLeaderboard} />
    <Route path="/Browse" component={MainBrowse} />
    <Route path="/User" component={MainUserProfile} />
    <Route path="/SignUp" component={MainSignUp} />
  </Router>
);

export default Routes;
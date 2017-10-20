import React from 'react';
import { Router, Route } from 'react-router';


//Looks like we only need to import the main file constrictors here
import App from './App';
//import Nav from './components/Nav.react';
//import HomePageBody from './components/HomePageBody.react';

import MainBrowse from './components/MainBrowse.react';
//import BrowseBody from './components/BrowseBody.react';

import MainLeaderboard from './components/MainLeaderboard.react';
//import LeaderboardBody from './components/LeaderboardBody.react';

import MainUserProfile from './components/MainUserProfile.react';
//import UserProfileBody from './components/UserProfileBody.react';


const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/LeaderboardMain" component={MainLeaderboard} />
    <Route path="/Browse" component={MainBrowse} />
    <Route path="/UserProfile" component={MainUserProfile} />
  </Router>
);

export default Routes;
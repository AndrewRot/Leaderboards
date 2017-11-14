import React from 'react';
import { Router, Route } from 'react-router';

//Looks like we only need to import the main file constrictors here
import App from './App';
import MainBrowse from './components/browse/MainBrowse';
import MainLeaderboard from './components/leaderboard/MainLeaderboard';
import MainUserProfile from './components/user-profile/MainUserProfile';
import Account from './components/Account';

//These were created from last pull request
import MainSignUpContainer from './components/login/MainSignUpContainer';
import MainSignOutContainer from './components/login/MainSignOutContainer';


const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/LeaderboardMain" component={MainLeaderboard} />
    <Route path="/Browse" component={MainBrowse} />
    <Route path="/User" component={MainUserProfile} />
    <Route path="/SignUp" component={MainSignUpContainer} />
    <Route path="/SignOut" component={MainSignOutContainer} />
  </Router>
);

export default Routes;
import React from 'react';
import { Router, Route } from 'react-router';

import App from './App';
import LeaderboardMain from './components/LeaderboardMain.react.js';

import Main from './components/Main.react.js';
import Navigationmenu from './components/Nav.react.js';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/LeaderboardMain" component={LeaderboardMain} />
    <Route path="*" component={App} />
  </Router>
);

export default Routes;
import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';


//import App from './App';
import Routes from './routes';


import registerServiceWorker from './registerServiceWorker';

/**
 * Import all page components here - maybe not need these here?
 
import Nav from './components/Nav.react';
import HomePageBody from './components/HomePageBody.react';

import MainBrowse from './components/MainBrowse.react';
import BrowseBody from './components/BrowseBody.react';

import MainLeaderboard from './components/MainLeaderboard.react';
import LeaderboardBody from './components/LeaderboardBody.react';

import MainUserProfile from './components/MainUserProfile.react';
import UserProfileBody from './components/UserProfileBody.react';
*/


ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);

//ReactDOM.render(
//	<App />, document.getElementById('root'));


registerServiceWorker();




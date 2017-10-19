import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './index.css';


import App from './App';
import Routes from './routes';


import registerServiceWorker from './registerServiceWorker';

/**
 * Import all page components here
 */
import Main from './components/Main.react';
import Nav from './components/Nav.react';
import LeaderboardMain from './components/LeaderboardMain.react';



ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);

//ReactDOM.render(
//	<App />, document.getElementById('root'));


registerServiceWorker();




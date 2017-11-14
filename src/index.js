import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import './css/index.css';
import Routes from './routes';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);


registerServiceWorker();




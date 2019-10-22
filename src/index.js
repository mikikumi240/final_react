import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'font-awesome/css/font-awesome.min.css';
import {HashRouter as Router,Route,Link} from 'react-router-dom';
import Parse from 'parse'

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'bU4jezaF90TnDsbkfiiDFqAhOGGB8DLlBYC9mVSX', // This is your Application ID
  'Oda8xcrgS5tZrCNOGmFjbBtNM9alUmMVrfFTh5Mk' // This is your Javascript key
);
ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));
serviceWorker.unregister();

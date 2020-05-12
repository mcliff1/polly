import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import registerServiceWorker from './registerServiceWorker';
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

//require('dotenv').config();
//console.log('ok TODO is dotenv.config necessary: %o', process.env);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
  //registerServiceWorker();

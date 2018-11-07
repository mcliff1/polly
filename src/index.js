import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';

require('dotenv').config();
require('util')
console.log('TODO is dotenv.config necessary:' + util.inspect(process.env, {showHidden: false, depth:null}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
  registerServiceWorker();

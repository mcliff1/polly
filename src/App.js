import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';
import AppNav from './AppNav';
import Home from './Home';
import History from './History';
require('dotenv').config()

class App extends Component {

  render() {
    return (

      <Router>
      <div className="App">
        <AppNav />

        <div>
        <Route exact path="/" component={Home} />
        <Route path="/history" component={History} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

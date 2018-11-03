import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import './App.css';
import TextToAudio from './TextToAudio';
import AudioList from './AudioList';
import AppNav from './AppNav';

class App extends Component {

  render() {
    return (

      <Router>
      <div className="App">
        <AppNav />

        <div>
        <Route exact path="/" component={Home} />
        <Route path="/history" component={Home} />
        </div>
      </div>
      </Router>
    );
  }
}

export default App;

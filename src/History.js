import React, { Component } from 'react';
import './App.css';
import AudioList from './AudioList';
import config from './config.js';

class History extends Component {

  render() {
    return (
      <div>
        <p>To work the filter, use &quot;*&quot; to show all</p>
        <AudioList />
        <p>Last Published: {config.publish_date}</p>
      </div>
    );
  }
}

export default History;

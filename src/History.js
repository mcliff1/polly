import React, { Component } from 'react';
import './App.css';
import AudioList from './AudioList';

class History extends Component {

  render() {
    return (
      <div>
        <p>To work the filter, use &quot;*&quot; to show all</p>
        <AudioList />
        <p>Last Published 10/23/2018</p>
      </div>
    );
  }
}

export default History;

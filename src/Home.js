import React, { Component } from 'react';
import './App.css';
import TextToAudio from './TextToAudio';
import AudioItem from './AudioItem';
import config from './config.js';

class Home extends Component {

  render() {
    return (
      <div>
        <div><p>
        This page will accept text, when submitted gets converted to MP3.
        The conversion happens via a Lambda function triggered via API Gateway,
        this results in the actual MP3 file being stored on a S3 bucket.
        A 2nd API call is available to pull the meta data for the audio clips
        </p></div>
        <TextToAudio />
        <p>To work the filter, use &quot;*&quot; to show all</p>
        <AudioItem />
        <p>Last Published: {config.publish_date}</p>
      </div>
    );
  }
}

export default Home;

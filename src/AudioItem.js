import React from 'react';
import { connect } from 'react-redux';

import AudioListViewDetail from './AudioListViewDetail';
import { updateItem } from './actions'

const AudioItem = ({needsUpdate, handleUpdate, audioItem, audioItemId}) => {
  console.log('process env:');
  console.log(process.env);

  console.log('API END POINT TO LOG IS:');
  console.log(process.env.API_ENDPOINT);
  console.log('APP1  IS:');
  console.log(process.env.APP1);

  if (needsUpdate) {
    // a little delay let's polly do the processing
    setTimeout(() => {
      console.log('handleSearch called after timeout');
      handleUpdate(audioItemId); }, 500);
  }

  return(
    <div>
      <p>Get this thing to show the most recently generated item</p>
      <AudioListViewDetail item={audioItem} />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    audioItem: state.audio.audioItem,
    audioItemId: state.audio.searchFilter,
    needsUpdate: state.audio.needsUpdate
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (filter) => dispatch(updateItem(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioItem);

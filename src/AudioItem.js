import React from 'react';
import { connect } from 'react-redux';

import AudioItemDetail from './AudioItemDetail';
import { updateItem } from './actions'

const AudioItem = ({needsUpdate, handleUpdate, audioItem, audioItemId, lastGenerated}) => {
  if (needsUpdate) {
    // a little delay let's polly do the processing
    setTimeout(() => {
      console.log('handleSearch called after timeout');
      handleUpdate(audioItemId); }, 1500);
  }

  return(
    <div>
      <p>Get this thing to show the most recently generated item</p>
      <AudioItemDetail item={audioItem} lastGen={lastGenerated} />
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps');
  return {
    audioItem: state.audio.audioItem,
    audioItemId: state.audio.searchFilter,
    needsUpdate: state.audio.needsUpdate,
    lastGenerated: state.audio.lastGenerated

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (filter) => dispatch(updateItem(filter))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioItem);

import React, { useState } from 'react';
import Track from "./Track";
import { addTrack } from './redux/actions';
import { connect } from "react-redux";


function Song({tracks, _addTrack}) {
  const trackElts = tracks.map((track) => {
    return <Track />
  });

  function onAddTrack() {
    _addTrack({asdf: "asdf"});
  }

  return (
    <>
      <div>
        <button onClick={onAddTrack}>Add Track</button>
      </div>
      {trackElts}
    </>
  );
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _addTrack: (track) => dispatch(addTrack({track}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Song);


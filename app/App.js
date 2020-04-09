import React, { useState } from 'react';
import { connect } from "react-redux";
import Song from "./Song";
import { addTrack } from './redux/actions';

function App({
  tracks, 
  _addTrack
}) {
  function onButtonClick() {
    _addTrack({asdf: "asdf"});
  }

  return (
    <>
      <div>
        <button onClick={onButtonClick}>Load Song</button>
        <button>Save Song</button>
      </div>
      <Song />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

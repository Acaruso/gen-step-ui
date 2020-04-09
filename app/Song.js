import React, { useState } from 'react';
import Track from "./Track";
// import { addTrack } from './redux/actions';
import { addTrack, deleteTrack } from './redux/slices/trackSlice';
import { connect } from "react-redux";


function Song({tracks, addTrack, deleteTrack}) {
  const trackElts = <Track />;
  // const trackElts = tracks.map((track) => {
  //   return <Track />
  // });

  console.log(tracks);

  function onAddTrack() {
    addTrack({name: "asdf"});
  }

  function onDeleteTrack() {
    deleteTrack({id: 0})
  }

  return (
    <>
      <div>
        <button onClick={onAddTrack}>Add Track</button>
        <button onClick={onDeleteTrack}>Delete Track</button>
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

const mapDispatchToProps = { addTrack, deleteTrack };

export default connect(mapStateToProps, mapDispatchToProps)(Song);


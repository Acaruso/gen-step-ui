import React, { useState } from 'react';
import Track from "./Track";
// import { addTrack } from './redux/actions';
import { addTrack } from './redux/slices/trackSlice';
import { connect } from "react-redux";


function Song({tracks, addTrack}) {
  const trackElts = <Track />;
  // const trackElts = tracks.map((track) => {
  //   return <Track />
  // });

  console.log(tracks);

  function onAddTrack() {
    addTrack({name: "asdf"});
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

// function mapDispatchToProps(dispatch) {
//   return {
//     _addTrack: (track) => dispatch(addTrack({track}))
//   }
// }

const mapDispatchToProps = { addTrack };

export default connect(mapStateToProps, mapDispatchToProps)(Song);


import React, { useState } from 'react';
import Track from "./Track";
import EventEditor from "./EventEditor";
import { addTrack, deleteTrackByName } from './redux/slices/trackSlice';
import { connect } from "react-redux";


function Song({tracks, addTrack, deleteTrackByName}) {
  const [trackNameValue, setTrackNameValue] = useState('');
  const [deleteTrackNameValue, setDeleteTrackNameValue] = useState('');

  const trackElts = tracks.ids.map((id) => {
    const track = tracks.items[id];
    return <Track track={track} />;
  });

  function onAddTrack() {
    addTrack({name: trackNameValue});
    setTrackNameValue('');
  }

  function onDeleteTrack() {
    deleteTrackByName({name: deleteTrackNameValue});
    setDeleteTrackNameValue('');
  }

  function onChangeDeleteTrackName(e) {
    setDeleteTrackNameValue(e.target.value);
  }

  function onChangeTrackName(e) {
    setTrackNameValue(e.target.value);
  }

  return (
    <div className="grid">
      <div>
        <div>
          <button>Load Song</button>
          <button>Save Song</button>
        </div>
        <div>
          <button onClick={onAddTrack}>Add Track</button>
          <input type="text" value={trackNameValue} onChange={onChangeTrackName} />
          <button onClick={onDeleteTrack}>Delete Track</button>
          <input type="text" value={deleteTrackNameValue} onChange={onChangeDeleteTrackName} />
        </div>
        {trackElts}
      </div>
      <EventEditor />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = { addTrack, deleteTrackByName };

export default connect(mapStateToProps, mapDispatchToProps)(Song);


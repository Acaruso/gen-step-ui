import React, { useState } from "react";
import Track from "./Track";

export default function Song() {
  const [tracks, setTracks] = useState([])
  const [trackNameValue, setTrackNameValue] = useState("");

  const trackElts = tracks.map((track) => {
    return <Track track={track}/>
  });

  function onAddTrack() {
    const newTrack = {
      name: trackNameValue,
      events: []
    };
    const newTracks = [ ...tracks ];
    newTracks.push(newTrack);
    setTracks(newTracks);
    setTrackNameValue("");
  }

  function onChangeTrackName(e) {
    setTrackNameValue(e.target.value);
  }

  return (
    <>
      <div>
        <button>Load Song</button>
        <button>Save Song</button>
      </div>
      <div>
        <button onClick={onAddTrack}>Add Track</button>
        <input type="text" value={trackNameValue} onChange={onChangeTrackName}/>
      </div>
      {trackElts}
    </>
  );
}

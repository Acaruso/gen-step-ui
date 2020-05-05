import React, { useState, useEffect, useRef } from 'react';
import Track from './Track';
import EventEditor from './EventEditor';
import Transport from './Transport';
import ProbabilityMatrix from './ProbabilityMatrix';
import { addTrack, deleteTrackByName, incrementTransport, triggerEvent } from '../redux/slices/trackSlice';
import { connect } from 'react-redux';
import * as Tone from 'tone';

// everything you do inside tick, for ex triggering audio events,
// think of it as being scheduled for the next tick
// hence weird transport math -- need to "look ahead"
function tick(time, args) {
  const tracks = args.tracks.current.items;
  const trackIds = args.tracks.current.ids;
  let transport = args.transport.current;

  transport = transport + 1;
  if (transport === 16) {
    transport = 0;
  }

  for (const id of trackIds) {
    const track = tracks[id];
    const event = track.events[transport];

    if (event && event.type !== 'rest') {
      args.triggerEvent({ id: id, event: event, time: time });
    }
  }

  args.incrementTransport();
}


function Song({tracks, addTrack, deleteTrackByName, incrementTransport, triggerEvent}) {
  const [trackNameValue, setTrackNameValue] = useState('');
  const [deleteTrackNameValue, setDeleteTrackNameValue] = useState('');
  const [loop, setLoop] = useState({});
  const [bpm, setBpm] = useState(120);

  // not sure why this is necessary, but Tone.Event callback doesn't read updated values from redux
  // but it can read them from a ref
  const transport = useRef(0);
  transport.current = tracks.transport;
  const refTracks = useRef({});
  refTracks.current = tracks;

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
    Tone.Transport.start();

    const _loop = new Tone.Event(
      tick,
      {
        tracks: refTracks,
        transport: transport,
        incrementTransport: incrementTransport,
        triggerEvent: triggerEvent
      } 
    );

    _loop.loop = true;
    _loop.loopEnd = '16n';

    setLoop(_loop);
  }, []);

  const trackElts = tracks.ids.map((id) => {
    const track = tracks.items[id];
    return <Track track={track} key={id} />;
  });

  function onClickAddTrack() {
    addTrack({name: trackNameValue});
    setTrackNameValue('');
  }

  function onClickDeleteTrack() {
    deleteTrackByName({name: deleteTrackNameValue});
    setDeleteTrackNameValue('');
  }

  function onClickSetBpm() {
    Tone.Transport.bpm.value = bpm;
  }
  
  function onChangeSetBPM(e) {
    const bpm = e.target.value.replace(/\D/,'');
    setBpm(bpm);
  }

  function onChangeDeleteTrackName(e) {
    setDeleteTrackNameValue(e.target.value);
  }

  function onChangeTrackName(e) {
    setTrackNameValue(e.target.value);
  }

  function onClickPlay() {
    loop.start(0);
  }

  function onClickStop() {
    loop.stop();
  }

  return (
    <>
      <div className="grid">
        <div>
          <div>
            <button>Load Song</button>
            <button>Save Song</button>
          </div>
          <div>
            <button onClick={onClickAddTrack}>Add Track</button>
            <input type="text" className="song-input" value={trackNameValue} onChange={onChangeTrackName} />
            <button onClick={onClickDeleteTrack}>Delete Track</button>
            <input type="text" className="song-input" value={deleteTrackNameValue} onChange={onChangeDeleteTrackName} />
            <button onClick={onClickSetBpm}>Set BPM</button>
            <input type="text" className="song-input" value={bpm} onChange={onChangeSetBPM} />
          </div>
          <div>
            <button onClick={onClickPlay}>Play</button>
            <button onClick={onClickStop}>Stop</button>
          </div>
          <Transport transport={tracks.transport}/>
          {trackElts}
        </div>
        <div>
          <EventEditor />
          <ProbabilityMatrix />
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = { addTrack, deleteTrackByName, incrementTransport, triggerEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Song);


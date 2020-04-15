import React, { useState, useEffect, useRef } from 'react';
import Track from './Track';
import EventEditor from './EventEditor';
import Transport from './Transport';
import { addTrack, deleteTrackByName, incrementTransport } from './redux/slices/trackSlice';
import { connect } from 'react-redux';
import * as Tone from 'tone';


function Song({tracks, addTrack, deleteTrackByName, incrementTransport}) {
  const [trackNameValue, setTrackNameValue] = useState('');
  const [deleteTrackNameValue, setDeleteTrackNameValue] = useState('');
  const [loop, setLoop] = useState({});

  // not sure why this is necessary, but Tone.Event callback doesn't read updated values from redux
  // but it can read them from a ref
  const transport = useRef(0);
  transport.current = tracks.transport;
  const refTracks = useRef({});
  refTracks.current = tracks.items;

  useEffect(() => {
    Tone.Transport.bpm.value = 120;
    Tone.Transport.start();

    const _loop = new Tone.Event(
      tick, 
      { tracks: refTracks, transport: transport, incrementTransport: incrementTransport } 
    );

    _loop.loop = true;
    _loop.loopEnd = '16n';

    setLoop(_loop);
  }, []);

  const trackElts = tracks.ids.map((id) => {
    const track = tracks.items[id];
    return <Track track={track} key={id} />;
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

  function onClickPlay() {
    loop.start(0);
  }

  function onClickStop() {
    loop.stop();
  }

  return (
    <>
      <div className='grid'>
        <div>
          <div>
            <button>Load Song</button>
            <button>Save Song</button>
          </div>
          <div>
            <button onClick={onAddTrack}>Add Track</button>
            <input type='text' value={trackNameValue} onChange={onChangeTrackName} />
            <button onClick={onDeleteTrack}>Delete Track</button>
            <input type='text' value={deleteTrackNameValue} onChange={onChangeDeleteTrackName} />
          </div>
          <Transport transport={tracks.transport}/>
          {trackElts}
        </div>
        <EventEditor />
      </div>
      <button onClick={onClickPlay}>Play</button>
      <button onClick={onClickStop}>Stop</button>
    </>
  );
}

function tick(time, args) {
  const tracks = args.tracks.current;
  const transport = args.transport.current;

  const curEvent = tracks[0].events[transport];

  if (curEvent && curEvent.type !== 'rest') {
    console.log('!!!!!!!!!!!!!!')
  }

  args.incrementTransport();
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = { addTrack, deleteTrackByName, incrementTransport };

export default connect(mapStateToProps, mapDispatchToProps)(Song);


import React, { useState, useEffect, useRef } from 'react';
import Track from './Track';
import EventEditor from './EventEditor';
import Transport from './Transport';
import { addTrack, deleteTrackByName, incrementTransport } from './redux/slices/trackSlice';
import { connect } from 'react-redux';
import * as Tone from 'tone';

// everything you do inside tick, for ex triggering audio events,
// think of it as being scheduled for the next tick
// hence weird transport math -- need to "look ahead"
function tick(time, args) {
  const tracks = args.tracks.current;
  let transport = args.transport.current;

  transport = transport + 1;
  if (transport === 16) {
    transport = 0;
  }

  const curEvent = tracks[0].events[transport];

  console.log('-----------------------------------')
  console.log(transport)
  console.log(curEvent)

  if (curEvent && curEvent.type !== 'rest') {
    // const synth = new Tone.Synth();
    // const chorus = new Tone.Chorus(4, 2.5, 0.5).toMaster();
    // synth.connect(chorus);

    const synth = new Tone.Synth();
    const channel = new Tone.Channel(-30).toMaster();
    synth.connect(channel);

    synth.triggerAttackRelease(curEvent.note, "8n");

    // synth.triggerAttackRelease('e3', "8n", time);
  }

  args.incrementTransport();
}


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
    Tone.Transport.bpm.value = 50;
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
          <div>
            <button onClick={onClickPlay}>Play</button>
            <button onClick={onClickStop}>Stop</button>
          </div>
          <Transport transport={tracks.transport}/>
          {trackElts}
        </div>
        <EventEditor />
      </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    tracks: state.tracks
  }
}

const mapDispatchToProps = { addTrack, deleteTrackByName, incrementTransport };

export default connect(mapStateToProps, mapDispatchToProps)(Song);


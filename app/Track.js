import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { selectStep, loadSample, updateEvent } from "./redux/slices/trackSlice";
const { ipcRenderer } = require('electron')

function Track({track, curSelectedStep, selectStep, loadSample, updateEvent}) {
  useEffect(() => {
    // set up event listener on file-path-loaded event
    ipcRenderer.on('file-path-loaded', (event, args) => {
      const { filePath, trackId } = args;

      // only load sample if event is for this/current track
      if (trackId === track.id) {
        loadSample({trackId: track.id, filePath: filePath});
      }
    });
  }, []);

  function onClickSquare(index) {
    selectStep({trackId: track.id, step: index});
  };

  function onDoubleClickSquare(index) {
    updateEvent({
      id: track.id,
      event: index,
      active: true,
      type: 'note',
      note: '',
      vel: '', 
      dur: ''
    });
  };

  function onClickLoadSample() {
    ipcRenderer.send('open-file-dialog', {trackId: track.id});
  }

  const squares = track.events.map((event, i) => {
    const selected = curSelectedStep.trackId === track.id && curSelectedStep.step === i;
    const hasEvent = event.active;
    return (
      <Square
        selected={selected}
        hasEvent={hasEvent}
        onClickSquare={onClickSquare}
        onDoubleClickSquare={onDoubleClickSquare}
        index={i}
        key={i}
      />
    );
  });

  return (
    <>
      <div>{track.name}</div>
      <div className="track">
        {squares}
      </div>
      <button onClick={onClickLoadSample}>Load Sample</button>
      <span>Sample: {track.sampleName || 'No sample loaded'}</span>
    </>
  );
}

function Square({selected, hasEvent, onClickSquare, onDoubleClickSquare, index}) {
  let classNames = ['square'];
  if (selected) {
    classNames.push('selected-square');
  } 
  if (hasEvent) {
    classNames.push('has-event');
  }
  const className = classNames.join(' ');

  return (
    <span 
      className={className}
      onClick={() => onClickSquare(index)}
      onDoubleClick={() => onDoubleClickSquare(index)}
    >
      { index % 4 === 0 ? 'X' : ''}
    </span>
  );
}

function mapStateToProps(state) {
  return {
    curSelectedStep: state.tracks.curSelectedStep
  }
}

const mapDispatchToProps = { selectStep, loadSample, updateEvent };

export default connect(mapStateToProps, mapDispatchToProps)(Track);

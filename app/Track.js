import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { selectStep, loadSample } from "./redux/slices/trackSlice";
const { ipcRenderer } = require('electron')

function Track({track, curSelectedStep, selectStep, loadSample}) {
  useEffect(() => {
    // set up event listener on file-path-loaded event
    ipcRenderer.on('file-path-loaded', (event, filePath) => {
      loadSample({trackId: track.id, filePath: filePath});
    });
  }, []);

  function onClickSquare(index) {
    selectStep({trackId: track.id, step: index});
  };

  function onClickLoadSample() {
    ipcRenderer.send('open-file-dialog', 111);
  }

  const squares = track.events.map((event, i) => {
    const selected = curSelectedStep.trackId === track.id && curSelectedStep.step === i;
    const hasEvent = event.active;
    return (
      <Square selected={selected} hasEvent={hasEvent} onClickSquare={onClickSquare} index={i} key={i}/>
    );
  });

  return (
    <>
      <div>{track.name}</div>
      <div className="track">
        {squares}
      </div>
      <button onClick={onClickLoadSample}>Load Sample</button>
    </>
  );
}

function Square({selected, hasEvent, onClickSquare, index}) {
  let classNames = ['square'];
  if (selected) {
    classNames.push('selected-square');
  } else if (hasEvent) {
    classNames.push('has-event');
  }
  const className = classNames.join(' ');

  return (
    <span 
      className={className}
      onClick={() => onClickSquare(index)}
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

const mapDispatchToProps = { selectStep, loadSample };

export default connect(mapStateToProps, mapDispatchToProps)(Track);

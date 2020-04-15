import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { selectStep } from "./redux/slices/trackSlice";
const { ipcRenderer } = require('electron')

function Track({track, curSelectedStep, selectStep}) {
  useEffect(() => {
    ipcRenderer.on('file-path-loaded', (event, arg) => {
      console.log('file-path-loaded ----------------------------');
      console.log(arg);
    });
  }, []);

  function onClickSquare(index) {
    selectStep({trackId: track.id, step: index});
  };

  function onClickLoadSample() {
    ipcRenderer.send('open-file-dialog');
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

const mapDispatchToProps = { selectStep };

export default connect(mapStateToProps, mapDispatchToProps)(Track);

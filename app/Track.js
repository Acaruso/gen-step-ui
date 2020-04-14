import React, { useState } from 'react';
import { connect } from "react-redux";
import { selectStep } from "./redux/slices/trackSlice";

function Track({track, curSelectedStep, selectStep}) {
  const onSquareClick = (index) => {
    selectStep({trackId: track.id, step: index});
  };

  const squares = track.events.map((event, i) => {
    const selected = curSelectedStep.trackId === track.id && curSelectedStep.step === i;
    const hasEvent = event.active;
    return (
      <Square selected={selected} hasEvent={hasEvent} onSquareClick={onSquareClick} index={i} key={i}/>
    );
  });

  return (
    <>
      <div>{track.name}</div>
      <div className="track">
        {squares}
      </div>
    </>
  );
}

function Square({selected, hasEvent, onSquareClick, index}) {
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
      onClick={() => onSquareClick(index)}
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

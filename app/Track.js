import React, { useState } from 'react';
import { connect } from "react-redux";
import { selectStep } from "./redux/slices/curSelectedStepSlice";

function Track({track, curSelectedStep, selectStep}) {
  const onSquareClick = (index) => {
    selectStep({trackId: track.id, step: index});
  };

  const squares = track.events.map((event, i) => {
    const selected = curSelectedStep.trackId === track.id && curSelectedStep.step === i;
    return <Square selected={selected} onSquareClick={onSquareClick} index={i} key={i}/>;
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

function Square({selected, onSquareClick, index}) {
  return (
    <span 
      className={selected ? "square selected-square" : "square"}
      onClick={() => onSquareClick(index)}
    />
  );
}

function mapStateToProps(state) {
  return {
    curSelectedStep: state.curSelectedStep
  }
}

const mapDispatchToProps = { selectStep };

export default connect(mapStateToProps, mapDispatchToProps)(Track);

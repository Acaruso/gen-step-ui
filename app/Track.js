import React, { useState } from 'react';

export default function Track({track}) {
  const defaultNumSteps = 16;
  const defaultSquareData = getEmptySquareData(defaultNumSteps);

  const [numSteps, setNumSteps] = useState(defaultNumSteps);
  const [squareData, setSquareData] = useState(defaultSquareData);

  const onSquareClick = (index) => {
    let newSquareData = getEmptySquareData(numSteps);
    newSquareData[index] = true;
    setSquareData(newSquareData);
  };

  const squares = squareData.map((elt, i) => {
    return <Square selected={elt} onSquareClick={onSquareClick} index={i} />;
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

function getEmptySquareData(numSteps) {
  let emptySquareData = [];
  for (let i = 0; i < numSteps; i++) {
    emptySquareData.push(false);
  }
  return emptySquareData;
}

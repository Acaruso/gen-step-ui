import React, { useState } from 'react';

export default function Track({song}) {
  const defaultNumSteps = 4;
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
      <div className="container">
        {squares}
      </div>
    </>
  );
}

function Square({selected, onSquareClick, index}) {
  return (
    <span 
      className={selected ? "item selected-item" : "item"}
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

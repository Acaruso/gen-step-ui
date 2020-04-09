import React, { useState } from 'react';

export default function Track({track}) {
  const defaultNumSteps = 8;
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
      <div className="container">
        {squares}
      </div>
      <TrackEvents events={track.events}/>
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

function TrackEvents({events}) {
  const [noteValue, setNoteValue] = useState("");

  function onChangeNote(e) {
    const val = e.target.value.replace(/\D/,'')
    setNoteValue(val);
  }

  const [velocityValue, setVelocityValue] = useState("");

  function onChangeVelocity(e) {
    const val = e.target.value.replace(/\D/,'')
    setVelocityValue(val);
  }

  function onClickAddEvent() {
    
  }

  return (
    <>
      <button onClick={onClickAddEvent}>Add Event</button>
      <div>
        <label>
          Note:
          <input type="text" value={noteValue} onChange={onChangeNote} />
        </label>
      </div>
      <div>
        <label>
          Velocity:
          <input type="text" value={velocityValue} onChange={onChangeVelocity} />
        </label>
      </div>
    </>
  );
}

function EventList({events}) {
  const eventElts = events.map((event) => {
    return (
      <div>
        <div>
          Note: {event.note}
        </div>
        <div>
          Vel: {event.vel}
        </div>
      </div>
    )
  });

  if (events) {
    return (
      <div>
        Events:
      </div>
    )
  }
}

function getEmptySquareData(numSteps) {
  let emptySquareData = [];
  for (let i = 0; i < numSteps; i++) {
    emptySquareData.push(false);
  }
  return emptySquareData;
}

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

function ProbabilityMatrix({probMatrix}) {
  const rows = renderMatrixRows(probMatrix);
  return (
    <div>
      <div>
        <h3>Probability Matrix</h3>
      </div>
      {rows}
    </div>
  )
}

function ProbabMatrixSquare({data}) {
  return (
    <span className="prob-matrix-square">
      {data}
    </span>
  )
}

function renderMatrixRows(probMatrix) {
  const numRows = probMatrix.ids.length + 1;
  let rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(renderMatrixRow(probMatrix, i));
  }
  return rows;
}

function renderMatrixRow(probMatrix, idx) {
  const cols = idx === 0 ? getMatrixHeaderRow(probMatrix) : getMatrixRow(probMatrix, idx);

  const squares = cols.map((elt, i) => {
    return <ProbabMatrixSquare data={elt} key={i} />;
  });

  return (
    <div className="prob-matrix-row">
      {squares}
    </div>
  );
}

function getMatrixHeaderRow(probMatrix) {
  const numCols = probMatrix.ids.length + 1;
  let cols = [];
  for (let i = 0; i < numCols; i++) {
    if (i === 0) {
      cols.push("");
    } else {
      cols.push(probMatrix.ids[i-1]);
    }
  }
  return cols;
}

function getMatrixRow(probMatrix, idx) {
  const numCols = probMatrix.ids.length + 1;
  let cols = [];
  const data = probMatrix.ids[idx-1];
  for (let i = 0; i < numCols; i++) {
    if (i === 0) {
      cols.push(data);
    } else {
      cols.push("");
    }
  }
  return cols;
}


function mapStateToProps(state) {
  return {
    probMatrix: state.tracks.probMatrix,
  };
}

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(ProbabilityMatrix);

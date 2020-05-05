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

function renderMatrixRows(probMatrix) {
  const numRows = probMatrix.ids.length + 1;
  let rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(renderMatrixRow(probMatrix, i));
  }
  return rows;
}

function renderMatrixRow(probMatrix, idx) {
  const rowData = idx === 0 ? getMatrixHeaderRow(probMatrix) : getMatrixRow(probMatrix, idx);

  const row = rowData.map((elt, i) => {
    if (elt.isHeader) {
      return <ProbMatrixHeaderSquare data={elt.data} key={i} />;
    } else {
      return <ProbMatrixSquare data={elt.data} key={i} />;
    }
  });

  return (
    <div className="prob-matrix-row">
      {row}
    </div>
  );
}

function getMatrixHeaderRow(probMatrix) {
  const numCols = probMatrix.ids.length + 1;
  let cols = [];
  for (let i = 0; i < numCols; i++) {
    if (i === 0) {
      cols.push({ data: "", isHeader: true });
    } else {
      cols.push({ data: probMatrix.ids[i-1], isHeader: true });
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
      cols.push({ data: data, isHeader: true });
    } else {
      cols.push({ data: "", isHeader: false });
    }
  }
  return cols;
}

function ProbMatrixSquare({data}) {
  return (
    <span className="prob-matrix-square">
      <input
        type="text"
        className="prob-matrix-input"
        value={data}
      />
    </span>
  );
}

function ProbMatrixHeaderSquare({data}) {
  return (
    <span className="prob-matrix-square">
      {data}
    </span>
  );
}


function mapStateToProps(state) {
  return {
    probMatrix: state.tracks.probMatrix,
  };
}

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(ProbabilityMatrix);

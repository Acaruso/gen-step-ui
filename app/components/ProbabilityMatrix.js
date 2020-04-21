import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";

function ProbabilityMatrix(probMatrix) {
  console.log('matrix')
  console.log(probMatrix)
  return (
    <div>
      <div>
        <h3>Probability Matrix</h3>
      </div>
      <div className="prob-matrix-row">
        <ProbabMatrixSquare />
        <ProbabMatrixSquare />
        <ProbabMatrixSquare />
      </div>
    </div>
  )
}

function ProbabMatrixSquare() {
  return (
    <span className="prob-matrix-square"></span>
  )
}

function mapStateToProps(state) {
  return {
    probMatrix: state.tracks.probMatrix,
  };
}

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(ProbabilityMatrix);

import React, { useState } from 'react';
import { connect } from "react-redux";

function Transport() {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    arr.push(<span className='transport-square' key={i}/>);
  }

  return (
    <div className='transport'>{arr}</div>
  )
}

export default Transport;
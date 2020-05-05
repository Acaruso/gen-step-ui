import React, { useState } from 'react';
import { connect } from "react-redux";

function Transport({transport}) {
  let arr = [];
  for (let i = 0; i < 16; i++) {
    if (transport === i) {
      arr.push(<span className='transport-square selected' key={i}/>);
    } else {
      arr.push(<span className='transport-square' key={i}/>);
    }
  }

  return (
    <div className='transport'>{arr}</div>
  )
}

export default Transport;
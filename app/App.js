import React, { useState } from 'react';
import { connect } from "react-redux";
import Song from "./Song";

function App({testVal}) {
  console.log('!!!!!!!!!!!')
  console.log(testVal)
  
  return (
    <>
      <div>
        <button>Load Song</button>
        <button>Save Song</button>
      </div>
      <Song />
    </>
  );
}

function mapStateToProps(state) {
  return {
    testVal: state.testVal.testVal
  }
}

export default connect(mapStateToProps)(App);

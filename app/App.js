import React, { useState } from 'react';
import { connect } from "react-redux";
import Song from "./Song";
import { testAction } from './redux/actions';

function App({testVal, _testAction}) {
  console.log('testVal:')
  console.log(testVal)
  
  function onButtonClick() {
    _testAction(testVal + 1);
  }

  return (
    <>
      <div>
        <button onClick={onButtonClick}>Load Song</button>
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

function mapDispatchToProps(dispatch) {
  return {
    _testAction: (testVal) => dispatch(testAction({testVal}))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

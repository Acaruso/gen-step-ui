const initialTestState = {
  testVal: 1
};

function testReducer(state = initialTestState, action) {
  if (action.type === "TEST_ACTION") {
    return {
      ...state,
      testVal: action.payload.testVal
    }
  } else {
    return state;
  }
}

export default testReducer;

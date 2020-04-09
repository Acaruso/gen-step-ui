const initialTracksState = {
  items: {},
  ids: []
};

function tracksReducer(state = initialTracksState, action) {
  if (action.type === "ADD_TRACK") {
    let newState = { ...state };
    newState[action.payload.id] = action.payload;
    return newState;
  } else {
    return state;
  }
}

export default tracksReducer;

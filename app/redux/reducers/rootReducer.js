import { combineReducers } from "redux";
import testReducer from "./testReducer";
import tracksReducer from "./tracksReducer";

const rootReducer = combineReducers({
  testVal: testReducer,
  tracks: tracksReducer
});

export default rootReducer;

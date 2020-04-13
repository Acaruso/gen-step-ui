import { combineReducers } from "redux";
import testReducer from "./testReducer";
import tracksReducer from "../slices/trackSlice";

const rootReducer = combineReducers({
  testVal: testReducer,
  tracks: tracksReducer
});

export default rootReducer;

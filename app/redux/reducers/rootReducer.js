import { combineReducers } from "redux";
import tracksReducer from "../slices/trackSlice";
import curSelectedStepReducer from "../slices/curSelectedStepSlice";

const rootReducer = combineReducers({
  tracks: tracksReducer,
  curSelectedStep: curSelectedStepReducer
});

export default rootReducer;

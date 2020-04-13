import { combineReducers } from "redux";
import tracksReducer from "../slices/trackSlice";
import curSelectedStepReducer from "../slices/curSelectedStepSlice";
import eventEditorFormReducer from "../slices/eventEditorFormSlice";

const rootReducer = combineReducers({
  tracks: tracksReducer,
  curSelectedStep: curSelectedStepReducer,
  eventEditorForm: eventEditorFormReducer
});

export default rootReducer;

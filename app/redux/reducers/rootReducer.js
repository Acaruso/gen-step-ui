import { combineReducers } from "redux";
import tracksReducer from "../slices/trackSlice";

const rootReducer = combineReducers({
  tracks: tracksReducer,
});

export default rootReducer;

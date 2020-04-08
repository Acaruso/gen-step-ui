import { combineReducers } from "redux";
import testReducer from "./testReducer";

const rootReducer = combineReducers({
  testVal: testReducer,
});

export default rootReducer;

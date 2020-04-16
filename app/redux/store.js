import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer"
import instMiddleware from './middleware/instMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: [instMiddleware],
});

export default store;

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newUserReducer from "./newUserRedux";
import userReducer from "./userRedux";

const combinedReducers = combineReducers({
  newUser: newUserReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
});

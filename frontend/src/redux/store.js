import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newUserReducer from "./newUserRedux";

const combinedReducers = combineReducers({
  newUser: newUserReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
});

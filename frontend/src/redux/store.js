import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newUserReducer from "./newUserRedux";
import userReducer from "./userRedux";
import shortlistDeleteReducer from "./shortlistDeleteRedux";

const combinedReducers = combineReducers({
  newUser: newUserReducer,
  user: userReducer,
  shortlistDelete: shortlistDeleteReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
});

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newUserReducer from "./newUserRedux";
import userReducer from "./userRedux";
import shortlistDeleteReducer from "./shortlistDeleteRedux";
import schoolsReducer from "./schoolsRedux";
import searchQReducer from "./searchQueryRedux";

const combinedReducers = combineReducers({
  newUser: newUserReducer,
  user: userReducer,
  shortlistDelete: shortlistDeleteReducer,
  schools: schoolsReducer,
  searchQ: searchQReducer,
});

export const store = configureStore({
  reducer: combinedReducers,
});

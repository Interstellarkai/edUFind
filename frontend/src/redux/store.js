import { configureStore, combineReducers } from "@reduxjs/toolkit";
import newUserReducer from "./newUserRedux";
import userReducer from "./userRedux";
import shortlistDeleteReducer from "./shortlistDeleteRedux";
import schoolsReducer from "./schoolsRedux";
import searchQReducer from "./searchQueryRedux";
import searchButtonReducer from "./searchButtonRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const combinedReducers = combineReducers({
  newUser: newUserReducer,
  user: userReducer,
  shortlistDelete: shortlistDeleteReducer,
  schools: schoolsReducer,
  searchQ: searchQReducer,
  searchButton: searchButtonReducer,
});

// Persist Configuration

const persistConfig = {
  key: "combined",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

// export const store = configureStore({
//   reducer: combinedReducers,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// let persistor = persistStore(store);

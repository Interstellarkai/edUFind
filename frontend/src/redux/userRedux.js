import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  userId: null,
  username: false,
  password: null,
  email: null,
  gender: null,
  motherTongueLanguage: null,
  educationLevel: null,
  region: null,
  ccaInterests: null,
};

const initialStateError = {
  isFetching: false,
  error: false,
  errorType: "",
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
    error: initialStateError,
  },
  reducers: {
    // Set Current User (After Registration)
    setCurrentUser: (state, action) => {
      state.value = { ...state.value, ...action.payload };
      state.error = initialStateError;
    },

    // Do this cause Async function (using API)
    loginStart: (state) => {
      state.error.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.error.isFetching = false;
      // Cause Backend is returning user object which is _id, not userId
      const { _id, ...others } = action.payload;
      state.value = { userId: _id, ...others };
      state.error = initialStateError;
    },

    loginFailure: (state) => {
      state.error.isFetching = false;
      state.error.error = true;
    },

    updateAccFailure: (state, action) => {
      state.error.isFetching = false;
      state.error.error = true;
      state.error.errorType = action.payload.errorType;
      state.error.message = action.payload.message;
    },

    resetError: (state) => {
      state.error = initialStateError;
    },

    logout: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const {
  setCurrentUser,
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateAccFailure,
  resetError,
} = userSlice.actions;
export default userSlice.reducer;

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

  isFetching: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    // Set Current User (After Registration)
    setCurrentUser: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },

    // Do this cause Async function (using API)
    loginStart: (state) => {
      state.value.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.value.isFetching = false;
      // Cause Backend is returning user object which is _id, not userId
      const { _id, ...others } = action.payload;
      state.value = { userId: _id, ...others };
    },
    loginFailure: (state) => {
      state.value.isFetching = false;
      state.value.error = true;
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
} = userSlice.actions;
export default userSlice.reducer;

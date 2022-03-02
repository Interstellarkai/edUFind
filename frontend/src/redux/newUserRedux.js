import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  username: null,
  password: null,
  email: null,
  gender: null,
  motherTongueLanguage: null,
  educationLevel: null,
  region: null,
  ccaInterest: null,

  isFetching: false,
  error: null,
  errorType: "",
  errorMessage: "",
};

const newUserSlice = createSlice({
  name: "newUser",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    updateNewUserInfo: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },

    createUserStart: (state) => {
      state.value.isFetching = true;
    },
    createUserSuccess: (state, action) => {
      state.value.isFetching = false;
      state.value.error = false;
      state.value = { ...state.value, ...action.payload };
    },
    createUserFailure: (state, action) => {
      state.value.isFetching = false;
      state.value.error = true;
      state.value.errorType = action.payload.errorType;
      state.value.errorMessage = action.payload.errorMessage;
    },
  },
});

export const {
  updateNewUserInfo,
  createUserStart,
  createUserSuccess,
  createUserFailure,
} = newUserSlice.actions;
export default newUserSlice.reducer;

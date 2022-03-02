import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  username: null,
  password: null,
  email: null,
  gender: "Male",
  motherTongueLanguage: null,
  educationLevel: null,
  region: null,
  ccaInterests: null,

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

    newUserReset: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const {
  updateNewUserInfo,
  createUserStart,
  createUserSuccess,
  createUserFailure,
  newUserReset,
} = newUserSlice.actions;
export default newUserSlice.reducer;

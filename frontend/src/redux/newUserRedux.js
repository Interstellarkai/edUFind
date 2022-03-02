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
  },
});

export const { updateNewUserInfo } = newUserSlice.actions;
export default newUserSlice.reducer;

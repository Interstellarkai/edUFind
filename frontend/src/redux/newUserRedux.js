import { createSlice } from "@reduxjs/toolkit";

const newUserSlice = createSlice({
  name: "newUser",
  initialState: {
    username: null,
    password: null,
    email: null,
    gender: null,
    motherTongueLanguage: null,
    educationLevel: null,
    region: null,
    ccaInterest: null,
  },
  reducers: {
    // Do this cause Async function (using API)
    updateNewUserInfo: (state, action) => {
      Object.keys(state).forEach((key) => {
        if (action.payload[key]) {
          state[key] = action.payload[key];
        }
      });
      //   state.username = action.payload.username;
      //   state.email = action.payload.email;
      //   state.password = action.payload.password;
      //   state.gender = action.payload.gender;
      //   state.montherTongueLanguage = action.payload.montherTongueLanguage;
      //   state.educationLevel = action.payload.educationLevel;
      //   state.region = action.payload.region;
      //   state.ccaInterest = action.payload.ccaInterest;
    },
  },
});

export const { updateNewUserInfo } = newUserSlice.actions;
export default newUserSlice.reducer;

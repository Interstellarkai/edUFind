import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  addState: false,
};

const shortlistAddSlice = createSlice({
  name: "shortlistAddSlice",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setShortlistAdd: (state) => {
      state.value.addState = true;
    },

    resetShortlistAdd: (state) => {
      state.value.addState = initialStateValue;
    },
  },
});

export const { setShortlistAdd, resetShortlistAdd } = shortlistAddSlice.actions;
export default shortlistAddSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  deleteState: false,
};

const shortlistDeleteSlice = createSlice({
  name: "shortlistDeleteSlice",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setShortlistDelete: (state) => {
      state.value.deleteState = true;
    },

    resetShortlistDelete: (state) => {
      state.value.deleteState = initialStateValue;
    },
  },
});

export const { setShortlistDelete, resetShortlistDelete } =
  shortlistDeleteSlice.actions;
export default shortlistDeleteSlice.reducer;

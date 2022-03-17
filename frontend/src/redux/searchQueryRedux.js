import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = "";

const searchQSlice = createSlice({
  name: "searchQ",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setSearchQ: (state, action) => {
      state.value = action.payload;
    },

    resetSearchQ: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { setSearchQ, resetSearchQ } = searchQSlice.actions;
export default searchQSlice.reducer;

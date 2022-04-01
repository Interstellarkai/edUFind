import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {
  clickState: false,
};

const searchButtonSlice = createSlice({
  name: "searchButton",
  initialState: {
    value: initialStateValue,
  },
  reducers: {
    setClick: (state) => {
      state.value.clickState = true;
    },

    resetClick: (state) => {
      state.value.clickState = false;
    },
  },
});

export const { setClick, resetClick } = searchButtonSlice.actions;

export default searchButtonSlice.reducer;

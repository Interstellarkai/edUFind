import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [];

// {
//     _id: 2,
//     gifted_ind: "No",
//     mothertongue3_code: "Tamil",
//     postal_code: "737916",
//     type_code: "GOVERNMENT SCHOOL",
//     second_vp_name: "MR SHEIK ALAUDIN B MOHD ISMAIL",
//     first_vp_name: "MR NG SONG LIM STEVEN",
//     mainlevel_code: "SECONDARY",
//     email_address: "Admiralty_SS@moe.edu.sg",
//     sap_ind: "No",
//     mrt_desc: "ADMIRALTY MRT",
//     bus_desc: "904",
//     telephone_no: "63651733",
//     ip_ind: "No",
//     principal_name: "MR LAM YUI- P'NG",
//     mothertongue1_code: "Chinese",
//     nature_code: "CO-ED SCHOOL",
//     autonomous_ind: "No",
//     session_code: "SINGLE SESSION",
//     school_name: "ADMIRALTY SECONDARY SCHOOL",
//     dgp_code: "WOODLANDS",
//     address: "31   WOODLANDS CRESCENT",
//     mothertongue2_code: "Malay",
//     zone_code: "NORTH",
//     url_address: "http://www.admiraltysec.moe.edu.sg"
// };

const initialStateError = {
  isFetching: false,
  error: false,
  errorType: "",
  message: "",
};

const schoolsSlice = createSlice({
  name: "user",
  initialState: {
    value: initialStateValue,
    error: initialStateError,
  },
  reducers: {
    // Set Current User (After Registration)
    setAllSchools: (state, action) => {
      state.value = [...action.payload];
      state.error = initialStateError;
    },

    resetSchools: (state) => {
      state.value = initialStateValue;
      state.error = initialStateError;
    },
  },
});

export const { setAllSchools, resetSchools } = schoolsSlice.actions;
export default schoolsSlice.reducer;

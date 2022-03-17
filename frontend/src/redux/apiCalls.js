import {
  EDITACCOUNT,
  publicRequest,
  SIGNUP,
  LOGIN,
  GETALLSCHOOLS,
} from "../requestMethod";

import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
  newUserReset,
} from "./newUserRedux";
import { setAllSchools } from "./schoolsRedux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  setCurrentUser,
  updateAccFailure,
} from "./userRedux";

export const login = async (dispatch, loginDetails) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post(LOGIN, loginDetails);
    if (res.data.success === true) {
      dispatch(loginSuccess({ ...res.data.user, token: res.data.token }));
      //   dispatch(setCurrentUser(res.body.user));
    } else {
      dispatch(loginFailure());
      console.log("FAILURE");
    }
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const createNewUser = async (dispatch, signupDetails) => {
  dispatch(createUserStart());
  console.log(signupDetails);
  try {
    const res = await publicRequest.post(SIGNUP, signupDetails);
    if (res.data.success === true) {
      dispatch(createUserSuccess(signupDetails));
      // console.log("SUCCESS");
    } else {
      const { errorType, message } = res.data;
      dispatch(createUserFailure({ errorType, errorMessage: message }));
      // console.log("FAILURE");
    }
  } catch (err) {
    dispatch(createUserFailure());
  }
};

export const updateUserDetails = async (dispatch, userDetails) => {
  console.log("Update: ", userDetails);
  const { token, ...details } = userDetails;
  try {
    const res = await publicRequest.post(
      EDITACCOUNT,
      { ...details },
      {
        headers: { authorization: token },
      }
    );
    if (res.data.success) {
      // console.log("Here");
      dispatch(newUserReset());
      dispatch(setCurrentUser({ ...userDetails, token }));
    } else {
      console.log("Error");
      // Error
      const { errorType, message } = res.data;
      dispatch(updateAccFailure({ errorType, message }));
    }
  } catch (err) {
    console.log(err);
  }
};

export const getSchools = async (dispatch) => {
  console.log("getSchools: ");
  try {
    const res = await publicRequest.get(GETALLSCHOOLS);
    dispatch(setAllSchools(res.data.schools));
  } catch (err) {
    console.log(err);
  }
};

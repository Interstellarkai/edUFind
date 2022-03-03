import { EDITACCOUNT, publicRequest, SIGNUP, LOGIN } from "../requestMethod";

import {
  createUserFailure,
  createUserStart,
  createUserSuccess,
} from "./newUserRedux";
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
      dispatch(loginSuccess(res.data.user));
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
  try {
    const res = await publicRequest.post(EDITACCOUNT, userDetails);
    if (res.data.success) {
      dispatch(setCurrentUser(userDetails));
    } else {
      // Error
      const { errorType, message } = res.data;
      dispatch(updateAccFailure({ errorType, message }));
    }
  } catch (err) {
    console.log(err);
  }
};

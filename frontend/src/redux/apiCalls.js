import { publicRequest, SIGNUP } from "../requestMethod";
import { LOGIN } from "../requestMethod";
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

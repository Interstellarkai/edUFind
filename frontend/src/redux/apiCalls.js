import { publicRequest } from "../requestMethod";
import { LOGIN } from "../requestMethod";
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

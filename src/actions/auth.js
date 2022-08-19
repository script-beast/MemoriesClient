import { AUTH } from "../constants/actionTypes";
import * as api from "../api";

export const signin = (fdata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(fdata);

    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signup = (fdata, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signup(fdata);

    dispatch({
      type: AUTH,
      payload: data,
    });
    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

import {
  postRegister,
  postLogin,
  postLogout,
  getCurrentUser,
} from "../../api/auth";
import toast from "react-hot-toast";

export const register =
  (email, username, password, role) => async (dispatch) => {
    try {
      await postRegister(email, username, password, role);
      toast.success("Successfully created a new user!");
      window.location.href = "/login";
    } catch (error) {
      dispatch({
        type: "REGISTER_FAIL",
        payload: error.response?.data?.message || error.message,
      });
      toast.error(error.response?.data.message || error.message);
    }
  };

export const fetchCurrentUser = () => async (dispatch) => {
  dispatch({ type: "FETCH_USER_REQUEST" });

  try {
    const result = await getCurrentUser();
    dispatch({ type: "FETCH_USER_SUCCESS", payload: result.data.user });
  } catch (error) {
    dispatch({
      type: "FETCH_USER_FAIL",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  try {
    await postLogin(username, password);
    dispatch(fetchCurrentUser());
    toast.success("Successfully logged in!");
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response?.data.message || error.message,
    });
    toast.error(error.response?.data.message || error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    await postLogout();
    dispatch({ type: "LOGOUT" });
    toast.success("You have been successfully logged out!");
  } catch (error) {
    toast.success(error.response?.data.message || error.message);
  }
};

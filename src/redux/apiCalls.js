import { loginStart, loginFailure, loginSuccess, logout } from "./userRedux";
import axios from "axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    // Send the login request with axios
    const res = await axios.post("http://localhost:5001/auth/login", user, {
      withCredentials: true, // Allows cookies to be sent with the request
    });
    // Dispatch success action with response data
    dispatch(loginSuccess(res.data));
  } catch (err) {
    // Enhanced error handling to capture specific error message
    let errorMessage = "Login failed. Please try again.";
    if (err.response && err.response.data) {
      errorMessage = err.response.data.message || errorMessage;
    }
    console.error("Login error:", errorMessage); // Log error details for debugging
    dispatch(loginFailure(errorMessage));
  }
};

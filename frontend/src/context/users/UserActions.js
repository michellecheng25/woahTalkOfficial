import axios from "axios";

export const login = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  let response;
  try {
    response = await axios.post("api/users/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    const message = error.response.data;
    throw new Error(message);
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
};

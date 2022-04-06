import axios from "axios";

export const login = async (userCredentials, dispatch) => {
  //dispatch({ type: "LOGIN_START" });
  let response;
  try {
    response = await axios.post(
      "http://localhost:5000/api/users/login",
      userCredentials
    );

    const userInfo = await axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${response.data.token}` },
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: userInfo.data });
    localStorage.setItem("token", JSON.stringify(response.data.token));
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

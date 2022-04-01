import axios from "axios";

const woahTalk = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const login = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  let response;
  try {
    response = await woahTalk.post("/users/login", userCredentials);
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    console.log(response);
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    const message = error.response.data;
    throw new Error(message);
  }
};

import { createContext, useReducer, useEffect } from "react";
import UserReducer from "./UserReducer";
import axios from "axios";

const INTIAL_STATE = {
  user: null,
  isFetching: true,
  error: null,
};

export const UserContext = createContext(INTIAL_STATE);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INTIAL_STATE);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) getCurrentUser(JSON.parse(token));
    else dispatch({ type: "LOGOUT" });
  }, []);

  console.log(state);

  const getCurrentUser = async (token) => {
    //dispatch({ type: "LOGIN_START" });
    const userInfo = await axios.get("http://localhost:5000/api/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "LOGIN_SUCCESS", payload: userInfo.data });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

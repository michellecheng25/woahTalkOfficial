import { createContext, useReducer } from "react";
import UserReducer from "./UserReducer";

const INTIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: null,
};

export const UserContext = createContext(INTIAL_STATE);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INTIAL_STATE);

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

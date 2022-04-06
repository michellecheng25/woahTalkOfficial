import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/users/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, isFetching } = useContext(UserContext);
  if (isFetching && localStorage.getItem("token")) return <div></div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute;

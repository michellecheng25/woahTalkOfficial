import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/users/UserContext";

const PrivateRoute = ({ redirectPath = "/login", children }) => {
  const { user } = useContext(UserContext);

  if (!user) return <Navigate to={redirectPath} replace />;

  return children ? children : <Outlet />;
};
export default PrivateRoute;

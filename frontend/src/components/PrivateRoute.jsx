import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/users/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, isFetching } = useContext(UserContext);
  const location = useLocation();

  if (isFetching) return <div></div>;

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default PrivateRoute;

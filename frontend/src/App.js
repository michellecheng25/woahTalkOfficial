import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Search from "./pages/Search";
import ExploreUsers from "./pages/ExploreUsers";
import ExploreCourses from "./pages/ExploreCourses";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/users/UserContext";
import UserSettings from "./pages/UserSettings";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute redirectPath="/login">
                    <Home />
                  </PrivateRoute>
                }
              />

              <Route path="/login" element={<Login />} />

              <Route
                path="/user-settings"
                element={
                  <PrivateRoute redirectPath="/login">
                    <UserSettings />
                  </PrivateRoute>
                }
              />

              <Route path="/register" element={<Register />} />

              <Route path="/search/:searchText" element={<Search />} />
              <Route path="/search" element={<Search />} />

              <Route path="/explore-users" element={<ExploreUsers />} />
              <Route path="/explore-courses" element={<ExploreCourses />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer hideProgressBar={true} />
      </UserProvider>
    </>
  );
}

export default App;

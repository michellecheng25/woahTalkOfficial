import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SearchUsers from "./pages/SearchUsers";
import SearchCourses from "./pages/SearchCourses";
import ExploreUsers from "./pages/ExploreUsers";
import ExploreCourses from "./pages/ExploreCourses";
import Profile from "./pages/Profile";
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
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
              </Route>

              <Route path="/login" element={<Login />} />

              <Route path="/user-settings" element={<PrivateRoute />}>
                <Route path="/user-settings" element={<UserSettings />} />
              </Route>

              <Route path="/register" element={<Register />} />

              <Route
                path="/search/users/:searchText"
                element={<SearchUsers />}
              />
              <Route
                path="/search/courses/:searchText"
                element={<SearchCourses />}
              />
              <Route path="/search" element={<SearchUsers />} />

              <Route path="/explore-users" element={<ExploreUsers />} />
              <Route path="/explore-courses" element={<ExploreCourses />} />

              <Route path="/profile/:username" element={<Profile />} />

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

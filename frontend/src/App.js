import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/users/UserContext";
import Profile from "./pages/Profile";

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
                path="/profile"
                element={
                  <PrivateRoute redirectPath="/login">
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
        <ToastContainer hideProgressBar={true} />
      </UserProvider>
    </>
  );
}

export default App;

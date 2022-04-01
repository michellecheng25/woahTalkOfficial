import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
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
            </Routes>
          </div>
        </Router>
        <ToastContainer hideProgressBar={true} />
      </UserProvider>
    </>
  );
}

export default App;

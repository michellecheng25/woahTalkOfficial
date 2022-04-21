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
import UserCourses from "./pages/UserCourses";
import PostPage from "./pages/PostPage";
import CoursePage from "./pages/CoursePage";
import CreateCourseContent from "./pages/CreateCourseContent";
import Chat from "./pages/Chat";
import CourseMaterials from "./pages/CourseMaterials";
import CourseAssignments from "./pages/CourseAssignments";
import Assignment from "./pages/Assignment";

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

              <Route path="/courses" element={<PrivateRoute />}>
                <Route path="/courses" element={<UserCourses />} />
              </Route>

              <Route path="/posts/:postId" element={<PostPage />} />

              <Route path="/courses/:courseId" element={<PrivateRoute />}>
                <Route path="/courses/:courseId" element={<CoursePage />} />
              </Route>

              <Route
                path="/courses/:courseId/create-content"
                element={<PrivateRoute />}
              >
                <Route
                  path="/courses/:courseId/create-content"
                  element={<CreateCourseContent />}
                />
              </Route>

              <Route
                path="/courses/:courseId/course-materials"
                element={<PrivateRoute />}
              >
                <Route
                  path="/courses/:courseId/course-materials"
                  element={<CourseMaterials />}
                />
              </Route>

              <Route
                path="/courses/:courseId/course-materials/:assignmentId"
                element={<PrivateRoute />}
              >
                <Route
                  path="/courses/:courseId/course-materials/:assignmentId"
                  element={<Assignment />}
                />
              </Route>

              <Route
                path="/courses/:courseId/assignments"
                element={<PrivateRoute />}
              >
                <Route
                  path="/courses/:courseId/assignments"
                  element={<CourseAssignments />}
                />
              </Route>

              <Route
                path="/courses/:courseId/assignments/:assignmentId"
                element={<PrivateRoute />}
              >
                <Route
                  path="/courses/:courseId/assignments/:assignmentId"
                  element={<Assignment />}
                />
              </Route>

              <Route path="/chat" element={<PrivateRoute />}>
                <Route path="/chat" element={<Chat />} />
              </Route>

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

import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { RiAddBoxFill } from "react-icons/ri";
import { Button } from "@material-ui/core";
import { joinCourse, leaveCourse } from "../context/users/UserActions";
import CourseSidebar from "../components/CourseSidebar";
import Announcement from "../components/Announcement";
import { ReactComponent as Teaching } from "../assets/svg/undraw_teaching_re_g7e3.svg";

//annoucements displayed
function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const isJoined = user.courses.includes(courseId);
  const [joined, setJoined] = useState(isJoined);
  const token = JSON.parse(localStorage.getItem("token"));
  const [courseAnnouncements, setCourseAnnouncements] = useState([]);

  useEffect(() => {
    getCourseInfo();
    getCourseAnnouncement();
  }, [joined]);

  const getCourseInfo = async () => {
    await axios
      .get("/api/coursepage/" + courseId)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch(console.log);

    setLoading(false);
  };

  const getCourseAnnouncement = async () => {
    await axios
      .get("/api/coursepage/" + courseId + "/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourseAnnouncements(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  const joinACourse = () => {
    const userAction = joined ? "leave" : "join";
    const action = {
      action: userAction,
    };
    console.log(action);

    axios
      .post("api/courses/" + courseId + "/join", action, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setJoined(!joined);
      })
      .catch(console.log);

    if (userAction === "join") joinCourse(courseId, dispatch);
    else leaveCourse(courseId, dispatch);
  };

  if (loading) return <div></div>;
  if (!course) return <NotFound />;

  return (
    <div>
      <Navbar />
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={"/courses/" + courseId}>
            <h1 style={{ color: "black", paddingLeft: "10px" }}>
              {course.courseName}
            </h1>
          </Link>

          {user &&
            (user._id === course.creatorId ? (
              <Link
                to={"/courses/" + courseId + "/create-content"}
                style={{
                  marginLeft: "auto",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <RiAddBoxFill size={40} />
              </Link>
            ) : (
              user.role === "Student" && (
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    marginLeft: "auto",
                    cursor: "pointer",
                    marginRight: "20px",
                    marginBottom: "10px",
                  }}
                  onClick={joinACourse}
                >
                  {joined ? "Leave Course" : "Join Course"}
                </Button>
              )
            ))}
        </div>
        <div style={{ display: "flex" }}>
          {isJoined && <CourseSidebar currentActive={"Announcements"} />}
          <div style={{ flex: "8", padding: "20px" }}>
            {isJoined ? (
              <>
                {courseAnnouncements.map((announcement) => {
                  return (
                    <Announcement
                      key={announcement._id}
                      announcement={announcement}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <Teaching style={{ margin: "0 auto", display: "block" }} />
                <p style={{ textAlign: "center" }}>
                  Join course to view course content
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;

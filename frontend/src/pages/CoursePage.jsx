import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { RiAddBoxFill } from "react-icons/ri";
import { Button } from "@material-ui/core";
import { joinCourse, leaveCourse } from "../context/users/UserActions";

function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const isJoined = user.courses.includes(courseId);
  console.log(isJoined);
  const [joined, setJoined] = useState(isJoined);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getCourseInfo();
  }, []);

  const getCourseInfo = async () => {
    await axios
      .get("/api/courses/" + courseId)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch(console.log);

    setLoading(false);
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
      .then(setJoined(!joined));

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
          <h1>{course.courseName}</h1>

          {user &&
            (user._id === course.creatorId ? (
              <RiAddBoxFill
                size={40}
                style={{ marginLeft: "auto", cursor: "pointer" }}
              />
            ) : (
              <Button
                type="submit"
                variant="contained"
                style={{ marginLeft: "auto", cursor: "pointer" }}
                onClick={joinACourse}
              >
                {joined ? "Leave Course" : "Join Course"}
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;

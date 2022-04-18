import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { RiAddBoxFill } from "react-icons/ri";

function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [joined, setJoined] = useState(false);

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

  const joinCourse = () => {
    setJoined(!joined);
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
              <button
                style={{ marginLeft: "auto", cursor: "pointer" }}
                onClick={joinCourse}
              >
                {joined ? "Join Course" : "Leave Course"}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;

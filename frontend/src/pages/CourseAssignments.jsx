import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { RiAddBoxFill } from "react-icons/ri";
import CourseSidebar from "../components/CourseSidebar";
import { dateTimeConversion } from "../utils/dateConversion";

function CourseAssignments() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const [assignments, setCourseAssignments] = useState([]);

  useEffect(() => {
    getCourseInfo();
    getCourseAssignments();
  }, []);

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

  const getCourseAssignments = async () => {
    await axios
      .get("/api/coursepage/" + courseId + "/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourseAssignments(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  if (loading) return <div></div>;
  if (!user.courses.includes(courseId)) return <NotFound />;

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
          {user && user._id === course.creatorId && (
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
          )}
        </div>
        <div style={{ display: "flex" }}>
          <CourseSidebar currentActive={"Assignments"} />
          <div
            style={{
              flex: "8",
              padding: "20px",
              fontSize: "20px",
            }}
          >
            <div style={{ display: "flex", borderBottom: "1px solid black" }}>
              <div style={{ flex: "10", fontWeight: "bold" }}>Name</div>
              <div style={{ flex: "2", fontWeight: "bold" }}>Due Date</div>
            </div>
            {assignments.map((assignment) => {
              const date = dateTimeConversion(assignment.updatedAt);
              return (
                <Link
                  to={"/courses/" + courseId + "/assignments/" + assignment._id}
                  key={assignment._id}
                  style={{
                    display: "flex",
                    padding: "15px 0px 15px 0px",
                    borderBottom: "1px solid black",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  <div style={{ flex: "10" }}>{assignment.title}</div>
                  <div style={{ flex: "2" }}>{date}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseAssignments;

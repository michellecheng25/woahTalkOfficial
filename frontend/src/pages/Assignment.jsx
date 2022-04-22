import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import Submission from "../components/Submission";
import { dateTimeConversion } from "../utils/dateConversion";
import { CgAttachment } from "react-icons/cg";
import setInputHeight from "../utils/setInputHeight";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

function Assignment() {
  const { courseId, assignmentId } = useParams();
  const { user } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const [isCreatingAssigment, setIsCreatingAssigment] = useState(false);
  const [studentSubmission, setStudentSubmission] = useState([]);
  const [submission, setSubmission] = useState(null);

  useEffect(() => {
    getCourseInfo();
    getAssignment();
    getSubmission();
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

  const getAssignment = async () => {
    await axios
      .get("/api/courses/" + courseId + "/assignments/" + assignmentId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setAssignment(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  const getSubmission = async () => {
    await axios
      .get(
        `/api/coursepage/${courseId}/assignments/${assignmentId}/submissions`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        setStudentSubmission(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  const onChange = async (e) => {
    setSubmission((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSubmit = async (e) => {
    setIsCreatingAssigment(true);
    e.preventDefault();

    await axios
      .post(
        `/api/courses/${courseId}/assignments/${assignmentId}/submissions`,
        submission,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("submission created!");
        setStudentSubmission([response.data]);
      })
      .catch(console.log);

    setIsCreatingAssigment(false);
  };

  if (loading) return <div></div>;
  if (!user.courses.includes(courseId)) return <NotFound />;

  return (
    <div>
      <Navbar />
      <div
        style={{
          padding: "50px",
          fontSize: "20px",
        }}
      >
        <h1>{assignment.title}</h1>
        <div
          style={{
            padding: "10px 0px",
            display: "flex",
            borderBottom: "1px solid black",
          }}
        >
          <div style={{ flex: "10" }}>
            {assignment.description && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {assignment.description}
              </div>
            )}
            {assignment.upload && (
              <a target="_blank" href={assignment.upload}>
                <CgAttachment size={25} />
                {assignment.upload}
              </a>
            )}
            {assignment.dueDate && (
              <div style={{ marginTop: "20px" }}>
                Due Date: {dateTimeConversion(assignment.dueDate)}
              </div>
            )}
          </div>

          {assignment.totalPoints && (
            <div
              style={{ flex: "2", display: "flex", justifyContent: "flex-end" }}
            >
              <div>
                {user.role !== "Teacher" && studentSubmission.length === 1
                  ? studentSubmission[0].grade
                  : "-"}{" "}
                /{assignment.totalPoints}
              </div>
            </div>
          )}
        </div>

        {assignment.folder === "Assignment" &&
          user.role !== "Teacher" &&
          studentSubmission.length === 0 && (
            <div style={{ marginTop: "20px" }}>
              <form onSubmit={onSubmit}>
                <textarea
                  type="text"
                  name="content"
                  placeholder="Type your submission"
                  style={{ width: "100%", minWidth: "50px" }}
                  onChange={(e) => {
                    setInputHeight(e, "50px");
                    onChange(e);
                  }}
                />

                <button
                  type="submit"
                  className="createCourseContentBtn"
                  disabled={isCreatingAssigment ? true : false}
                >
                  {isCreatingAssigment ? <CircularProgress /> : "Submit"}
                </button>
              </form>
            </div>
          )}

        {user.role === "Student" && studentSubmission.length > 0 && (
          <div>{studentSubmission[0].content}</div>
        )}

        {user.role === "Teacher" && assignment.folder === "Assignment" && (
          <div>
            <div style={{ marginTop: "20px" }}>All Submissions</div>
            {studentSubmission.length > 0 &&
              studentSubmission.map((submission) => {
                const totalPoints = assignment.totalPoints
                  ? assignment.totalPoints
                  : 0;
                return (
                  <Submission
                    key={submission._id}
                    submission={submission}
                    totalPoints={totalPoints}
                    courseId={courseId}
                    assignmentId={assignmentId}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Assignment;

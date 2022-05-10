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
import { light } from "@material-ui/core/styles/createPalette";

function Assignment() {
  const { courseId, assignmentId } = useParams();
  const { user } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState({});
  const token = JSON.parse(localStorage.getItem("token"));
  const [isCreatingAssigment, setIsCreatingAssigment] = useState(false);
  const [studentSubmissions, setStudentSubmissions] = useState([]);
  const [submission, setSubmission] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
        setStudentSubmissions(response.data);
        if (response.data.length === 1) setSubmission(response.data[0].content);
        console.log(response.data);
      })
      .catch(console.log);
    setLoading(false);
  };

  const onChange = async (e) => {
    setSubmission(e.target.value);
  };

  const onSubmit = async (e) => {
    console.log("create new sub");
    console.log(submission);
    setIsCreatingAssigment(true);
    e.preventDefault();

    await axios
      .post(
        `/api/courses/${courseId}/assignments/${assignmentId}/submissions`,
        { content: submission },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("submission created!");
        setStudentSubmissions([response.data]);
      })
      .catch(console.log);

    setIsCreatingAssigment(false);
  };

  const onEdit = async (e) => {
    setIsCreatingAssigment(true);
    e.preventDefault();

    await axios
      .put(
        `/api/courses/${courseId}/assignments/${assignmentId}/submissions/${studentSubmissions[0]._id}`,
        { content: submission },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        toast.success("sucessfully updated submission");
        console.log(response);
        setIsEditing(false);
      })
      .catch((error) => console.log(error.response.data));

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
          // Make the Assignment centered
          marginLeft: "15%",
          marginRight: "15%",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          {/* Course Page Title */}
          <h1>{assignment.title}</h1>

          {/* Submission Status - AVALIABLE FOR STUDENT ONLY */}
          {user.role == "Student" &&
            assignment.folder === "Assignment" &&
            studentSubmissions.length > 0 && (
              <p
                style={{
                  height: "fit-content",
                  marginTop: "8px",
                  backgroundColor: "Green",
                  borderRadius: "4px",
                  fontWeight: "light",
                  padding: "7px",
                  color: "White",
                  marginLeft: "10px",
                  fontSize: "16px",
                }}
              >
                Submitted
              </p>
            )}
          {user.role == "Student" &&
            assignment.folder === "Assignment" &&
            studentSubmissions.length <= 0 && (
              <p
                style={{
                  height: "fit-content",
                  marginTop: "8px",
                  backgroundColor: "Red",
                  borderRadius: "4px",
                  fontWeight: "light",
                  padding: "7px",
                  color: "White",
                  marginLeft: "10px",
                  fontSize: "16px",
                }}
              >
                Not Submitted
              </p>
            )}
        </div>

        <hr
          style={{
            border: "2px solid black",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        ></hr>

        <div
          style={{
            padding: "10px 0px",
            display: "flex",
            // borderBottom: "3px solid  #e0dcd5",
          }}
        >
          <div style={{ flex: "10" }}>
            {/* Description */}
            {assignment.description && (
              <div style={{ whiteSpace: "pre-wrap" }}>
                {/* Assignment Page Description SubHeader  */}
                {assignment.folder === "Assignment" && (
                  <p
                    style={{
                      textDecoration: "none",
                      marginTop: "10px",
                      fontWeight: "bold",
                      fontSize: "22px",
                    }}
                  >
                    Assignment Information
                  </p>
                )}
                {assignment.description}
              </div>
            )}
            {/* Upload Component */}
            {assignment.upload && (
              <a target="_blank" href={assignment.upload}>
                <CgAttachment size={25} />
                {assignment.upload}
              </a>
            )}
            {/* Due Date */}
            {assignment.dueDate && (
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "20px",
                  fontWeight: "light",
                }}
              >
                <b>Due Date:</b> {dateTimeConversion(assignment.dueDate)}
              </div>
            )}
          </div>

          {/* Assignment Score */}
          {assignment.totalPoints && (
            <div
              style={{ flex: "2", display: "flex", justifyContent: "flex-end" }}
            >
              <div
                style={{
                  border: "2px",
                  backgroundColor: "transparent",
                  marginTop: "10px",
                  border: "3px solid black",
                  borderWidth: "2px",
                  height: "fit-content",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                {user.role !== "Teacher" && studentSubmissions.length === 1
                  ? studentSubmissions[0].grade
                  : "-"}{" "}
                /{assignment.totalPoints}
              </div>
            </div>
          )}
        </div>

        <hr
          style={{
            border: "2px solid #d6cfc5",
            borderRadius: "5px",
            marginBottom: "5px",
          }}
        ></hr>

        {assignment.folder === "Assignment" &&
          user.role === "Student" &&
          (studentSubmissions.length === 0 || isEditing) && (
            <div style={{ marginTop: "20px" }}>
              <form onSubmit={!isEditing ? onSubmit : onEdit}>
                <textarea
                  type="text"
                  name="content"
                  placeholder="Type your submission"
                  value={submission}
                  required
                  // rows = "4"
                  style={{
                    width: "100%",
                    minWidth: "50px",
                    padding: "15px",
                    marginBottom: "10px",
                    border: "3px solid #d6cfc5",
                    borderRadius: "5px",
                  }}
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

        {user.role === "Student" &&
          studentSubmissions.length > 0 &&
          !isEditing && (
            <>
              <div style={{ marginTop: "20px" }}>{submission}</div>
              <button
                className="createCourseContentBtn"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                Edit Submission
              </button>
            </>
          )}

        {user.role === "Teacher" && assignment.folder === "Assignment" && (
          <div>
            <div style={{ marginTop: "20px" }}>All Submissions</div>
            {studentSubmissions.length > 0 &&
              studentSubmissions.map((submission) => {
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

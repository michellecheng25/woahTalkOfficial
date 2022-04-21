import { Link } from "react-router-dom";
import { dateTimeConversion } from "../utils/dateConversion";
import { useState, useContext } from "react";
import UserContext from "../context/users/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

//some of these classes are from post.jsx. i just copied some parts of it over
function Submission({ submission, totalPoints, courseId, assignmentId }) {
  const { user } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem("token"));
  const [grade, setGrade] = useState(submission.grade || 0);

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `/api/courses/${courseId}/assignments/${assignmentId}/submissions/${submission._id}/grade`,
        { grade: grade },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        toast.success("Graded submission!");
      })
      .catch(console.log);
  };

  return (
    <form
      className="submission"
      onSubmit={onSubmit}
      style={{
        padding: "50px",
        border: "1px solid #ccc",
        backgroundColor: "white",
        borderRadius: "10px",
        margin: "20px 0px",
      }}
    >
      <div className="submissionWrapper">
        <div className="user-info">
          <Link to="/" className="profile-pic">
            <img src={submission.creatorId.profilePicture} alt="profile-pic" />
          </Link>
          <div>
            <Link to="/">
              <h2>{submission.creatorId.username}</h2>
            </Link>
            <h4>{dateTimeConversion(submission.updatedAt)}</h4>
          </div>
        </div>

        <div className="content" style={{ whiteSpace: "pre-wrap" }}>
          {submission.content}
        </div>
      </div>
      {totalPoints !== 0 && (
        <div>
          <label>Grade: </label>
          <div style={{ display: "inline-block", border: "1px solid #ccc" }}>
            <input
              name="name"
              style={{
                height: "40px",
                width: "40px",
                fontSize: "20px",
              }}
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            />
            <span> / {totalPoints}</span>
          </div>
        </div>
      )}

      {totalPoints !== 0 && (
        <button type="Grade" className="createCourseContentBtn">
          Submit
        </button>
      )}
    </form>
  );
}

export default Submission;

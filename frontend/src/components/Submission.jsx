import { Link } from "react-router-dom";
import { dateTimeConversion } from "../utils/dateConversion";
import { useState, useContext } from "react";
import UserContext from "../context/users/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { flexbox } from "@mui/system";

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
        padding: "25px",
        border: "1px solid black",
        backgroundColor: "white",
        borderRadius: "10px",
        margin: "20px 0px",
      }}
    >
      <div className="style.submissionWrapper">
        <div className="user-info">
          <Link
            to={`/profile/${submission.creatorId.username}`}
            className="profile-pic"
          >
            <img
              src={submission.creatorId.profilePicture}
              style={{ width: "40px", height: "40px" }}
              alt="profile-pic"
            />
          </Link>
          <div>
            <Link to={`/profile/${submission.creatorId.username}`}>
              <h2 style={{ fontSize: "19px", color: "black !important" }}>
                {submission.creatorId.username}
              </h2>
            </Link>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: "normal",
                marginTop: "3px",
              }}
            >
              {dateTimeConversion(submission.updatedAt)}
            </h4>
          </div>
        </div>

        <div
          className="content"
          style={{
            whiteSpace: "pre-wrap",
            fontSize: "17px",
            marginTop: "10px",
          }}
        >
          {submission.content}
        </div>

        <div
          style={{
            height: "45px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {totalPoints !== 0 && (
            <div style={{ display: "flex" }}>
              <p style={{ marginTop: "13px", fontWeight: "bold" }}>Grade: </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "5px",
                  marginRight: "10px",
                }}
              >
                <input
                  name="name"
                  style={{
                    height: "40px",
                    width: "43px",
                    fontSize: "20px",
                    padding: "3px",
                    borderRadius: "8px",
                  }}
                  value={grade}
                  onChange={(e) => {
                    setGrade(e.target.value);
                  }}
                />
                <span style={{ fontWeight: "bold" }}> / {totalPoints}</span>
              </div>
            </div>
          )}
          {totalPoints !== 0 && (
            <button
              style={{
                display: "flex",
                justifyContent: "flex-end",
                borderRadius: "10px",
              }}
              type="Grade"
              className="createCourseContentBtn"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

const style = {
  submissionWrapper: {
    position: "relative",
    display: "flex",
  },
};
export default Submission;

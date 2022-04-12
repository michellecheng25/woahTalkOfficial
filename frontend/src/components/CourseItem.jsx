import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import "./courseItem.css";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../context/users/UserContext";
import { joinCourse, leaveCourse } from "../context/users/UserActions";

function CourseItem({ course, userCourseList }) {
  const courseLink = "/courses/" + course._id;
  const isJoined = userCourseList.includes(course._id);
  const [join, setJoin] = useState(isJoined);
  const token = JSON.parse(localStorage.getItem("token"));
  const { user, dispatch } = useContext(UserContext);

  const onJoin = () => {
    setJoin(!join);
    joinTheCourse();
  };

  const joinTheCourse = async () => {
    if (user) {
      const userAction = join ? "leave" : "join";
      const followAction = {
        action: userAction,
      };
      console.log(followAction);

      axios
        .post("api/courses/" + course._id + "/join", followAction, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          console.log(join);
        })
        .catch((error) => toast.error(error.response.data));

      if (userAction === "join") joinCourse(course._id, dispatch);
      else {
        leaveCourse(course._id, dispatch);
      }
    } else console.log("cant join");
  };

  return (
    <div className="courseBox">
      <Link to={courseLink}>
        <h3 className="courseName">{course.courseName}</h3>
        <p className="courseDescription">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </Link>

      <div onClick={onJoin}>
        <h4 className="join-btn">{join ? "Leave" : "Join"}</h4>
      </div>
    </div>
  );
}

CourseItem.defaultProps = {
  userCourseList: [],
};

export default CourseItem;

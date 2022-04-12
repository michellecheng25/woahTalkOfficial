import { ReactComponent as NoCourses } from "../assets/svg/undraw_online_learning_re_qw08.svg";
import "./courseResults.css";
import CourseItem from "./CourseItem";
import UserContext from "../context/users/UserContext";
import { useContext } from "react";

function CourseResults({ courses }) {
  const { user } = useContext(UserContext);
  return (
    <div className="CourseResultsList">
      {courses.map((course) => {
        return (
          <CourseItem
            key={course._id}
            course={course}
            userCourseList={user ? user.courses : []}
          />
        );
      })}
    </div>
  );
}

CourseResults.defaultProps = {
  courses: [],
};

export default CourseResults;

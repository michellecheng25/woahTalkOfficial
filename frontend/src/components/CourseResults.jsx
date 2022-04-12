import { ReactComponent as NoCourses } from "../assets/svg/undraw_online_learning_re_qw08.svg";
import "./courseResults.css";
import CourseItem from "./CourseItem";

function CourseResults({ courses }) {
  return (
    <div className="CourseResultsList">
      {courses.map((course) => {
        return <CourseItem key={course._id} course={course} />;
      })}
    </div>
  );
}

CourseResults.defaultProps = {
  courses: [],
};

export default CourseResults;

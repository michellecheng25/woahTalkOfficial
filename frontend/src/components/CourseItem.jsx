import { Link, useNavigate } from "react-router-dom";
import "./courseItem.css";

function CourseItem({ course }) {
  const courseLink = "/courses/" + course._id;
  return (
    <div className="courseBox">
      <h3 className="courseName">{course.courseName}</h3>
      <p className="courseDescription">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Link to={courseLink}>
        <h4 className="join-btn">Join</h4>
      </Link>
    </div>
  );
}

export default CourseItem;

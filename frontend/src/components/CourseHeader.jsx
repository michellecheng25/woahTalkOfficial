import "./courseHeader.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function CourseHeader({ currentActive }) {
  const { courseId } = useParams();

  return (
    <div className="courseHeader">
      <div className="courseHeader-wrapper">
        <Link
            to={"/courses/" + courseId}
            className={currentActive === "Announcements" ? "active" : ""}
          >
            Announcements
          </Link>
      </div>
      <div className="courseHeader-wrapper">
          <Link
          to={"/courses/" + courseId + "/course-materials"}
          className={currentActive === "Course Materials" ? "active" : ""}
        >
          Course Materials
        </Link>
      </div> 
      <div className="courseHeader-wrapper">
          <Link
          to={"/courses/" + courseId + "/assignments"}
          className={currentActive === "Assignments" ? "active" : ""}
        >
          Assignments
        </Link>
        </div>
    </div>
  );
}

export default CourseHeader;




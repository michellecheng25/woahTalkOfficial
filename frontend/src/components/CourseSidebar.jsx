import "./courseSidebar.css";
import { Link, useNavigate, useParams } from "react-router-dom";

function CourseSidebar({ currentActive }) {
  const { courseId } = useParams();

  return (
    <div className="courseSidebar">
      <Link
        to={"/courses/" + courseId}
        className={currentActive === "Announcements" ? "active" : ""}
      >
        Announcements
      </Link>

      <Link
        to={"/courses/" + courseId + "/course-materials"}
        className={currentActive === "Course Materials" ? "active" : ""}
      >
        Course Materials
      </Link>

      <Link
        to={"/courses/" + courseId + "/assignments"}
        className={currentActive === "Assignments" ? "active" : ""}
      >
        Assignments
      </Link>
    </div>
  );
}

export default CourseSidebar;

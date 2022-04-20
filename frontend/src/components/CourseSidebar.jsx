import "./courseSidebar.css";
import { Link, useLocation } from "react-router-dom";

function CourseSidebar({ currentActive }) {
  const location = useLocation();

  return (
    <div className="courseSidebar">
      <Link
        to={location.pathname}
        className={currentActive === "Announcements" && "active"}
      >
        Announcements
      </Link>

      <Link to={location.pathname + "/course-materials"}>Course Materials</Link>

      <Link to={location.pathname + "/assignments"}>Assignments</Link>
    </div>
  );
}

export default CourseSidebar;

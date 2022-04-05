import "./toggle.css";
import { Link } from "react-router-dom";
function Toggle({ active, firstLink, secondLink }) {
  return (
    <div className="explore-toggle-btns">
      <Link
        to={firstLink}
        className="users-toggle"
        style={{
          backgroundColor: active === "users" && "#283436",
          color: active === "users" && "white",
        }}
      >
        Users
      </Link>

      <Link
        to={secondLink}
        className="courses-toggle"
        style={{
          backgroundColor: active === "courses" && "#283436",
          color: active === "courses" && "white",
        }}
      >
        Courses
      </Link>
    </div>
  );
}

export default Toggle;

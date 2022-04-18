import { Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import "./courseItem.css";

function CourseItem({ course }) {
  const courseLink = "/courses/" + course._id;

  return (
    <div className="courseBox">
      <Link to={courseLink}>
        <h3 className="courseName">{course.courseName}</h3>
        <p className="courseDescription">{course.description}</p>

        <h4 className="join-btn">View Course</h4>
      </Link>
    </div>
  );
}

export default CourseItem;

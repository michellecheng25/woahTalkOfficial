import Navbar from "../components/Navbar";
import CourseResults from "../components/CourseResults";
import { useState, useEffect } from "react";

function UserCourses() {
  const [courses, setCourses] = useState([]);
  return (
    <div>
      <Navbar />
      <CourseResults courses={courses} />
    </div>
  );
}

export default UserCourses;

import Navbar from "../components/Navbar";
import UserResults from "../components/UserResults";
import { useState, useEffect } from "react";
import axios from "axios";
import Toggle from "../components/Toggle";
import CourseResults from "../components/CourseResults";

function ExploreCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const response = await axios.get("/api/courses/");
    setCourses(response.data);
  };

  return (
    <>
      <Navbar />
      <Toggle
        active={"courses"}
        firstLink={"/explore-users"}
        secondLink={"/explore-courses"}
      />
      <CourseResults courses={courses} />
    </>
  );
}

export default ExploreCourses;

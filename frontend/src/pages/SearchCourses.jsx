import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Toggle from "../components/Toggle";
import CourseResults from "../components/CourseResults";

function SearchCourses() {
  let { searchText } = useParams();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, [searchText]);

  const fetchCourses = async () => {
    const response = await axios.get("/api/search/courses/" + searchText);
    setCourses(response.data);
  };

  return (
    <div>
      <Navbar searchText={searchText} />
      <Toggle
        active={"courses"}
        firstLink={"/search/users/" + searchText}
        secondLink={"/search/courses/" + searchText}
      />
      <CourseResults searchText={searchText} courses={courses} />
    </div>
  );
}

export default SearchCourses;

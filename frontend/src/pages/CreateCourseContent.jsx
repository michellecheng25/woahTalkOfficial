import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import NotFound from "./NotFound";

function CreateCourseContent() {
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    getCourseInfo();
  }, []);

  const getCourseInfo = async () => {
    await axios
      .get("/api/courses/" + courseId)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch(console.log);

    setLoading(false);
  };

  if (loading) return <div></div>;
  if (!course || course.creatorId !== user._id) return <NotFound />;

  return (
    <>
      <Navbar />
      <div style={{ marginLeft: "30px", padding: "30px" }}>
        <h1>{course.courseName}</h1>

        <form style={{ marginTop: "20px" }}>
          <div>
            <h3>Title</h3>
            <input
              type="text"
              name="title"
              placeholder="title"
              autoComplete="off"
            />
          </div>
          <div>
            <h3>Folder</h3>
            <select name="folder">
              <option value="Announcement">Announcement</option>
              <option value="Course Materials">Course Materials</option>
              <option value="Assignments">Assignments</option>
            </select>
          </div>
          <div>
            <h3>Points</h3>
            <input
              type="number"
              name="totalPoints"
              placeholder="100"
              autoComplete="off"
            />
          </div>

          <div>
            <h3>Due Date</h3>
          </div>
          <div>
            <h3>Description</h3>
            <textarea
              type="text"
              name="description"
              placeholder="description"
              rows="3"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateCourseContent;

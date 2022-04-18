import Navbar from "../components/Navbar";
import CourseResults from "../components/CourseResults";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import { MdOutlineAddCircle } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import { joinCourse } from "../context/users/UserActions";

Modal.setAppElement("body");

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { user, dispatch } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    courseName: "",
    language: "English",
    level: "Novice",
    description: "",
  });

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    await axios
      .get("/api/profiles/" + user.username + "/courses")
      .then((response) => setCourses(response.data.courses))
      .catch(console.log);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onChange = (e) => {
    setNewCourse((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");

    await axios
      .post("/api/courses", newCourse, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setNewCourse({
          courseName: "",
          language: "English",
          level: "Novice",
          description: "",
        });
        joinCourse(response.data._id, dispatch);
        toast.success("successfully create course!");
        getCourses();
      });

    closeModal();
  };

  return (
    <div>
      <Navbar />
      {user.role === "Teacher" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            margin: "20px auto",
            maxWidth: "200px",
            border: "1px solid #ccc",
            borderRadius: "40px",
            padding: "10px",
            backgroundColor: "rgb(245, 250, 250)",
            cursor: "pointer",
          }}
          onClick={openModal}
        >
          <MdOutlineAddCircle size={50} />
          Create new course
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h3 style={{ textAlign: "center" }}>Create a new Course</h3>
        <form className="createCourse" onSubmit={handleSubmit}>
          <h5 style={{ marginTop: "10px" }}>Course name</h5>
          <input
            type="text"
            name="courseName"
            placeholder="course name"
            onChange={onChange}
            value={newCourse.courseName}
            autoComplete="off"
            required
          />
          <h5 style={{ marginTop: "10px" }}>
            What is the target language of this course?
          </h5>
          <select
            id="language"
            name="language"
            onChange={onChange}
            value={newCourse.language}
          >
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <h5 style={{ marginTop: "10px" }}>What the level of this course?</h5>
          <select
            id="level"
            name="level"
            onChange={onChange}
            value={newCourse.level}
          >
            <option value="Beginner">Novice</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <h5 style={{ marginTop: "10px" }}>Course Description</h5>
          <textarea
            type="text"
            name="description"
            placeholder="description"
            rows="3"
            style={{ width: "100%" }}
            onChange={onChange}
            value={newCourse.description}
          />

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </form>
      </Modal>

      <CourseResults courses={courses} />
    </div>
  );
}

export default UserCourses;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
  },
};

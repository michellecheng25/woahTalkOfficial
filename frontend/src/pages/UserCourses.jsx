import Navbar from "../components/Navbar";
import CourseResults from "../components/CourseResults";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import { MdOutlineAddCircle } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";

Modal.setAppElement("body");

function UserCourses() {
  const [courses, setCourses] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  const { user } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [newCourse, setNewCourse] = useState(null);

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

  const createCourse = async () => {
    if (!newCourse) toast.error("Create course info !");
    else
      await axios
        .post("/api/courses", newCourse, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data);
          setNewCourse(null);
          setCourses((prev) => {
            return [response.data, ...courses];
          });
        })
        .catch(console.log);
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
        <h3>Create a new Course</h3>
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

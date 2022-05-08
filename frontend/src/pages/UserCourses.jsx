import Navbar from "../components/Navbar";
import CourseResults from "../components/CourseResults";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import { CgAddR } from "react-icons/cg";
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
            maxWidth: "310px",
            border: "1px solid #152E34",
            borderRadius: "10px",
            padding: "15px",
            backgroundColor: "rgb(245, 250, 250)",
            cursor: "pointer",
            textAlign: "center"
          }}
          onClick={openModal}
        >
          <CgAddR size={30} style={{color: "#152E34", marginLeft:"32px"}} />
          <span style={{marginLeft: "10px", fontWeight: "bold" }}>Create New Course </span>
        </div>
      )}
        
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        >
        <h2 style={{ textAlign: "center", color: "#234831", marginBottom: "10px" }}>Create New Course</h2>
        <form className="createCourse" onSubmit={handleSubmit}>
          <div style={customStyles.contentWrapper}>
            <div style={customStyles.contentFormat}>
                <h5 style={{marginTop: "8.5px", alignItems: "center"}}>Course Name:</h5>
                <input
                  type="text"
                  name="courseName"
                  // placeholder="Course name"
                  onChange={onChange}
                  value={newCourse.courseName}
                  autoComplete="off"
                  style = {{marginLeft: "10px", paddingLeft: "10px", paddingTop: "4px", paddingBottom: "4px", borderRadius: "10px",  border: "1.9px solid #58716C"}}
                  required
                />
            </div>  
          <div style={customStyles.contentFormat}>

              <h5 style={{ marginTop: "8.5px" }}>
                What is the target language of this course?
              </h5>
              <select
                id="language"
                name="language"
                onChange={onChange}
                value={newCourse.language}
                style = {{marginLeft: "10px", borderRadius: "10px", paddingLeft: "4px", paddingTop: "4px", textAlign: "Center", paddingBottom: "5px", border: "1.9px solid #58716C", color: "#58716C"}}
              >
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>

              <h5 style={{ marginTop: "8.5px", marginLeft: "20px" }}>What the level of this course?</h5>
              <select
                id="level"
                name="level"
                onChange={onChange}
                value={newCourse.level}
                style = {{marginLeft: "10px", borderRadius: "10px", paddingLeft: "4px", paddingTop: "4px", paddingBottom: "5px", border: "1.9px solid #58716C", color: "#58716C"}}
              >
                <option value="Beginner">Novice</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
                
            </div>

          </div>
          
          <h5 style={{ marginTop: "8px", color: "#152e34" }}>Course Description: </h5>
          <p style={{ marginTop: "2px", color: "#58716C", fontSize: "13px" }}>The description your write below will help students decide if your course is the one for them.</p>
          <textarea
            type="text"
            name="description"
            rows="3"
            style={{ width: "100%", marginTop: "10px", padding:"10px", borderRadius: "10px",  border: "1.9px solid #58716C" }}
            onChange={onChange}
            value={newCourse.description}
          />

          <Button
            type="submit"
            variant="contained"
            style={{  margin: "10px auto", display: "block", backgroundColor: "#152e34", color: "white", borderRadius: "10px", width: "293.33px" }}
          >
            Publish
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
    borderRadius:"10px",
    border: "1px solid #152E34", 
    fontSize: "18px"
    
  },
  contentWrapper: {
    display: "flex !important",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%"
  },
  contentFormat: {
    color: "#152e34",
    height: "auto",
    margin: "5px auto auto",
    display: "flex",
  }, 
  datePicker:{
    marginLeft: "10px", 
    borderRadius: "10px", 
    paddingLeft: "4px", 
    paddingTop: "4px", 
    textAlign: "Center", 
    paddingBottom: "5px", 
    border: "1.9px solid #58716C", 
    color: "#58716C"
  }
};

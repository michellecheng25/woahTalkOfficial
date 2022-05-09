import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { MdAddToPhotos } from "react-icons/md";
import { dateTimeConversion } from "../utils/dateConversion";
import CourseHeader from "../components/CourseHeader";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";
import uploadFile from "../utils/uploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@material-ui/core";
import setInputHeight from "../utils/setInputHeight";
import DatePicker from "react-datepicker";

function CourseAssignments() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const [assignments, setCourseAssignments] = useState([]);
  const [dueDate, setDueDate] = useState(new Date());
  const [modalIsOpen, setIsOpen] = useState(false);
  const [assignment, setAssigment] = useState({
    title: "",
    folder: "Assignment",
    description: "",
    totalPoints: "",
  });
  const [file, setFile] = useState(null);
  const [isCreatingAssigment, setIsCreatingAssigment] = useState(false);

  useEffect(() => {
    getCourseInfo();
    getCourseAssignments();
  }, []);

  const openModal = () => {
    setIsOpen(true);
    setDueDate(new Date());
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  const onChange = async (e) => {
    setAssigment((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const getCourseInfo = async () => {
    await axios
      .get("/api/coursepage/" + courseId)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch(console.log);

    setLoading(false);
  };

  const getCourseAssignments = async () => {
    await axios
      .get("/api/coursepage/" + courseId + "/assignments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourseAssignments(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  const handleSubmit = async (e) => {
    setIsCreatingAssigment(true);
    e.preventDefault();

    let fileUrl;
    if (file && assignment.folder !== "Announcement") {
      fileUrl = await uploadFile(file, token);
    }

    const newAssignment = {
      ...assignment,
      dueDate,
      ...(fileUrl && { upload: fileUrl }),
    };

    console.log(newAssignment);

    try {
      const response = await axios.post(
        "/api/courses/" + courseId + "/assignments",
        newAssignment,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);

      toast.success("created!");
      setCourseAssignments((prevState) => [...prevState, response.data]);
      setAssigment({
        title: "",
        folder: "Assignment",
        description: "",
        totalPoints: "",
      });
      setFile(null);
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }

    setIsCreatingAssigment(false);
  };

  if (loading) return <div></div>;
  if (!user.courses.includes(courseId)) return <NotFound />;

  return (
    <div>
      <Navbar />
      <div
        style={{
          margin: "25px auto",
          display: "flex",
          flexDirection: "column",
          width: "1000px",
        }}
      >
        <div style={{ display: "flex", marginBottom: "4px" }}>
          <h1 style={{ color: "black", marginRight: "10px", fontSize: "48px" }}>
            {course.courseName}
          </h1>
          {course.level === "novice" && (
            <p
              style={{
                backgroundColor: "#F8CB86",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              Novice
            </p>
          )}
          {course.level === "intermediate" && (
            <p
              style={{
                backgroundColor: "#ECA645",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              Intermediate
            </p>
          )}
          {course.level === "advanced" && (
            <p
              style={{
                backgroundColor: "#336D49",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              Advanced
            </p>
          )}

          {course.language === "english" && (
            <p
              style={{
                backgroundColor: "#547DDE",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              English
            </p>
          )}
          {course.language === "chinese" && (
            <p
              style={{
                backgroundColor: "#547DDE",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              Chinese
            </p>
          )}
          {course.language === "french" && (
            <p
              style={{
                backgroundColor: "#547DDE",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              French
            </p>
          )}
          {course.language === "spanish" && (
            <p
              style={{
                backgroundColor: "#547DDE",
                borderRadius: "10px",
                color: "white",
                padding: "7px 7px 7px 7px",
                height: "30px",
                fontSize: "14px",
                marginTop: "13px",
                marginRight: "10px",
              }}
            >
              Spanish
            </p>
          )}
        </div>

        <p style={{ fontWeight: "normal" }}>{course.description}</p>
        <CourseHeader currentActive={"Assignments"} />
        <div style={{ display: "flex" }}>
          <div
            style={{
              flex: "8",
              fontSize: "20px",
            }}
          >
            {user && user._id === course.creatorId && (
              <div
                style={{
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={openModal}
              >
                <div
                  style={{
                    display: "flex",
                    padding: "15px 0px 15px 0px",
                    borderRadius: "10px",
                    border: "1px solid black",
                    marginBottom: "10px",
                    fontSize: "20px",
                    color: "black",
                    backgroundColor: "#234831",
                    marginTop: "25px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div>
                      <MdAddToPhotos
                        size={30}
                        style={{ marginLeft: "15px", color: "white" }}
                      />
                    </div>
                    <p
                      style={{
                        marginLeft: "10px",
                        marginTop: "6px",
                        color: "white",
                      }}
                    >
                      Create a new assignment
                    </p>
                  </div>
                </div>
              </div>
            )}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
              <h2
                style={{
                  textAlign: "center",
                  color: "#234831",
                  marginBottom: "10px",
                }}
              >
                {course.name}
              </h2>
              <form className="createCourse" onSubmit={handleSubmit}>
                <div>
                  <div>
                    <h5
                      style={{
                        marginTop: "10px",
                        alignItems: "center",
                        marginRight: "15px",
                      }}
                    >
                      Title:
                    </h5>
                    <input
                      type="text"
                      name="title"
                      onChange={onChange}
                      value={assignment.title}
                      autoComplete="off"
                      style={{
                        paddingLeft: "10px",
                        paddingTop: "4px",
                        paddingBottom: "4px",
                        width: "100%",
                        height: "40px",
                        borderRadius: "10px",
                        border: "1.9px solid #58716C",
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label>Points</label>
                    <input
                      id="points"
                      type="number"
                      name="totalPoints"
                      placeholder="100"
                      autoComplete="off"
                      value={assignment.points}
                      onChange={onChange}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <label style={{ width: "100px" }}>Due Date</label>
                    <DatePicker
                      id="dueDate"
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      minDate={new Date()}
                      showTimeInput
                    />
                  </div>
                  <div>
                    <h5 style={{ marginTop: "8px", color: "#152e34" }}>
                      Upload a file:{" "}
                    </h5>
                    <div className="create-content">
                      <input
                        type="file"
                        name="uploads"
                        id="upload"
                        onChange={handleFileInput}
                      />
                    </div>
                  </div>
                  <h5 style={{ marginTop: "8px", color: "#152e34" }}>
                    Description:{" "}
                  </h5>
                  <textarea
                    type="text"
                    name="description"
                    rows="3"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1.9px solid #58716C",
                    }}
                    onChange={(e) => {
                      setInputHeight(e, "200px");
                      onChange(e);
                    }}
                    value={assignment.description}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isCreatingAssigment ? true : false}
                  style={{
                    margin: "10px auto",
                    display: "block",
                    backgroundColor: "#152e34",
                    color: "white",
                    borderRadius: "10px",
                    width: "293.33px",
                  }}
                >
                  {isCreatingAssigment ? (
                    <CircularProgress size={20} />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Modal>

            <div
              style={{
                display: "flex",
                marginTop: "20px",
                marginBottom: "4px",
              }}
            >
              <div style={{ flex: "6", fontWeight: "bold" }}>Name</div>
              <div style={{ flex: "2", fontWeight: "bold" }}>Due Date</div>
            </div>

            <hr
              style={{
                borderRadius: "10px",
                border: "1.5px solid black",
                marginBottom: "10px",
                backgroundColor: "#000000",
              }}
            />

            {assignments.map((assignment) => {
              const date = dateTimeConversion(assignment.updatedAt);
              return (
                <Link
                  to={"/courses/" + courseId + "/assignments/" + assignment._id}
                  key={assignment._id}
                  style={{
                    display: "flex",
                    padding: "15px 0px 15px 0px",
                    borderRadius: "10px",
                    border: "1px solid black",
                    marginBottom: "10px",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  <div style={{ flex: "6", marginLeft: "15px" }}>
                    {assignment.title}
                  </div>
                  <div style={{ flex: "2" }}>
                    {date}{" "}
                    <MdDelete
                      style={{ color: "#336D49", marginLeft: "10px" }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default CourseAssignments;

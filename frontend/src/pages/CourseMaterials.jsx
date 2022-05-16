import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { MdNoteAdd } from "react-icons/md";
import { BsFileEarmarkPdf } from "react-icons/bs";
import CourseHeader from "../components/CourseHeader";
import { dateConversionNums } from "../utils/dateConversion";
import { Divider } from "@material-ui/core";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import { toast } from "react-toastify";
import uploadFile from "../utils/uploadFile";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "@material-ui/core";

Modal.setAppElement("body");

function CourseMaterials() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const [courseMaterials, setCourseMaterials] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [assignment, setAssigment] = useState({
    title: "",
    folder: "Course Material",
  });
  const [file, setFile] = useState(null);
  const [isCreatingAssigment, setIsCreatingAssigment] = useState(false);

  useEffect(() => {
    getCourseInfo();
    getCourseMaterials();
  }, []);

  const openModal = () => {
    setIsOpen(true);
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

  const onDelete = async (materialsId) => {
    console.log("delete assignment");
    axios
      .delete("/api/courses/" + courseId + "/assignments/" + materialsId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourseMaterials((prev) =>
          prev.filter((materials) => materials._id !== materialsId)
        );
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  const handleSubmit = async (e) => {
    setIsCreatingAssigment(true);
    e.preventDefault();
    const fileUrl = await uploadFile(file, token);

    const newAssignment = {
      ...assignment,
      upload: fileUrl,
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

      toast.success("created!");
      setCourseMaterials((prevState) => [...prevState, response.data]);

      setAssigment({
        title: "",
        folder: "Announcement",
        description: "",
        points: "",
      });
      setFile(null);
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }

    setIsCreatingAssigment(false);
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

  const getCourseMaterials = async () => {
    await axios
      .get("/api/coursepage/" + courseId + "/course-materials", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourseMaterials(response.data);
        console.log(response.data);
      })
      .catch(console.log);
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
                backgroundColor: "#455EE3",
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
                backgroundColor: "#45C7E3",
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
                backgroundColor: "#45E3BD",
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
                backgroundColor: "#E345B7",
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
                backgroundColor: "#8445EC",
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
                backgroundColor: "#E36945",
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
              Spanish
            </p>
          )}
        </div>

        <p style={{ fontWeight: "normal" }}>{course.description}</p>
        <CourseHeader currentActive={"Course Materials"} />
        {user && user._id === course.creatorId ? (
         
            <div
              style={{
                marginTop: "25px",
                marginBottom: "10px",
                // marginRight: "auto",
                cursor: "pointer",
                height: "68px",
                borderRadius: "10px",
                padding: "5px",
                width: "324",
                border: "1px dashed #234831",
                display: "flex",
                color: "black"
              }}
              onClick={openModal}
            >
              <div style={{ marginTop: "10px",display: "flex 6", width:"100%", textAlign: "center" }}>
              <p
                style={{
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              ><MdNoteAdd
                  size={25}
                  style={{
                  }}
                /> Add a course file
              </p>
              </div>
            </div>
        
        ) : (
          <div style={{ marginTop: "25px" }}> </div>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
        >
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
            <div style={customStyles.contentWrapper} >
              <div style={customStyles.contentFormat} >
                <h5
                  style={{
                    marginTop: "6px",
                    alignItems: "center",
                    marginRight: "15px",
                    marginBottom: "5px"
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
                    width: "40%",
                    height: "28px",
                    borderRadius: "10px",
                    border: "1.9px solid #58716C",
                  }}
                  required
                />
              </div>
              <h5 style={{ marginTop: "10px", color: "#152e34" }}>
                Upload a file:{" "}
              </h5>
              <p style={{ marginTop: "2px", color: "#58716C", fontSize: "13px" }}>
                Supported formats PNG, JPG, or PDF. 
              </p>
              <div
                className="create-content"
                style={{ marginTop: "3px !important" }}
              >
                <input
                  type="file"
                  name="uploads"
                  id="upload"
                  onChange={handleFileInput}
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="createCourseContentBtn"
              disabled={isCreatingAssigment ? true : false}
              style={{
                margin: "10px auto",
                display: "block",
                backgroundColor: "#152e34",
                color: "white",
                borderRadius: "10px",
                width: "293.33px",
                float: "unset",
              }}
            >
              {isCreatingAssigment ? <CircularProgress size={20} /> : "Create"}
            </Button>
          </form>
        </Modal>


        {courseMaterials == 0 && user.role === "Student" && (
              <p style={{ textAlign: "center", marginTop: "120px", fontWeight: "bold", color: "#58716C", fontSize: "13px" }}>
                <span style={{fontWeight: "bolder", fontSize: "24px", color: "#2C4733"}}>
                No Files Yet
                </span> <br></br>
                Your teacher haven't uploaded any material
              </p>
            )
            }

            {courseMaterials == 0 && user.role === "Teacher" && (
              <p style={{ textAlign: "center", marginTop: "120px", fontWeight: "bold", color: "#58716C", fontSize: "13px" }}>
                <span style={{fontWeight: "bolder", fontSize: "24px", color: "#2C4733"}}>
                No Files Uploaded Yet
                </span> <br></br>
                Click "Add a course file" to upload a PNG, JPG or PDF file 
              </p>
            )
            }

        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {courseMaterials.map((material) => {
            const date = dateConversionNums(material.updatedAt);
            return (
              <>
                <div
                  style={{
                    fontSize: "20px",
                    color: "black",
                    width: "33%",
                    display: "block",
                    flexWrap: "wrap"
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      borderRadius: "10px",
                      padding: "6px 6px 10px",
                      marginBottom: "10px",
                      marginRight: "5px",
                      border: "1px solid black",
                      maxHeight: "190px",
                      backgroundColor: "#D7E0D5",
                      display: "flex",
                      
                    }}
                  >
                    {/* THERE ARE TWO LINK TO THE COURSE MATERIAL PAGE BECAUSE THE DELETE NEEDS TO BE TRIGGER TOO */}
                    <a
                      href={material.upload}
                      target="_blank"
                      key={material._id}
                      style={{ color: "black" }}
                    >
                      <div
                        style={{
                          marginTop: "14px",
                          marginRight: "10px",
                          paddingBottom: "4px",
                          paddingLeft: "5px",
                          marginBottom: "0px",
                        }}
                      >
                        <BsFileEarmarkPdf size={30} />
                      </div>
                    </a>
                    <div
                      style={{
                        marginTop: "10px",
                        marginRight: "8px",
                        fontWeight: "bold",
                        width: "100%",
                      }}
                    >
                      <div style={{ display: "flex", marginRight: "0px" }}>
                        <div
                          style={{
                            flex: "8",
                            textOverflow: "hidden",
                            width: "80px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <a
                            href={material.upload}
                            target="_blank"
                            key={material._id}
                            style={{ color: "black" }}
                          >
                            {material.title}{" "}
                          </a>
                        </div>

                        {user && user._id === course.creatorId && (
                          <div style={{ flex: "2" }}>
                            {" "}
                            <MdDelete
                              style={{
                                color: "#234831",
                                float: "Right",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                onDelete(material._id);
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: "normal",
                          textAlign: "right",
                          marginTop: "8px",
                        }}
                      >
                        Uploaded on {date}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CourseMaterials;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "800px",
    borderRadius: "10px",
    border: "1px solid #152E34",
    fontSize: "18px",
    marginTop: "20px",
  },
  contentWrapper: {
    display: "flex !important",
    flexDirection: "column",
    flexWrap: "wrap",
    width: "100%",
  },
  contentFormat: {
    color: "#152e34",
    height: "auto",
    margin: "5px auto auto",
    display: "flex",
  },
};

import Navbar from "../components/Navbar";
import "./createCourseContent.css";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import NotFound from "./NotFound";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uploadFile from "../utils/uploadFile";
import setInputHeight from "../utils/setInputHeight";
import { toast } from "react-toastify";
import { MdAssignment } from "react-icons/md";
import CircularProgress from "@mui/material/CircularProgress";

function CreateCourseContent() {
  const { courseId } = useParams();
  const { user } = useContext(UserContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dueDate, setDueDate] = useState(new Date());
  const [assignment, setAssigment] = useState({
    title: "",
    folder: "Announcement",
    description: "",
    totalPoints: "",
  });
  const [file, setFile] = useState(null);
  const [isCreatingAssigment, setIsCreatingAssigment] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    getCourseInfo();
  }, []);

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
      .get("/api/courses/" + courseId)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch(console.log);

    setLoading(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  const onSubmit = async (e) => {
    setIsCreatingAssigment(true);
    e.preventDefault();

    let fileUrl;
    if (file && assignment.folder !== "Announcement") {
      fileUrl = await uploadFile(file, token);
    }

    const newAssignment = {
      ...assignment,
      courseId,
      ...(assignment.folder !== "Assignment" && { totalPoints: "" }),
      ...(assignment.folder === "Assignment" && { dueDate }),
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

      toast.success("created!");

      let redirectLink = "/courses/" + courseId;
      if (assignment.folder === "Assignment") {
        redirectLink =
          "/courses/" + courseId + "/assignments/" + response.data._id;
      } else if (assignment.folder === "Course Materials") {
        redirectLink =
          "/courses/" + courseId + "/course-materials/" + response.data._id;
      }
      navigate(redirectLink);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }

    setIsCreatingAssigment(false);
    setAssigment({
      title: "",
      folder: "Announcement",
      description: "",
      points: "",
    });
    setFile(null);
  };

  if (loading) return <div></div>;
  if (!course || course.creatorId !== user._id) return <NotFound />;

  return (
    <>
      <Navbar />
      <div style={{ marginLeft: "30px", padding: "30px" }}>
        <h1>{course.courseName}</h1>

        <form style={{ marginTop: "20px" }} onSubmit={onSubmit}>
          <div className="create-content">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="title"
              autoComplete="off"
              value={assignment.title}
              onChange={onChange}
              required
            />
          </div>
          <div className="create-content-inline">
            <div className="create-content">
              <label>Folder</label>
              <select
                name="folder"
                id="folder"
                onChange={onChange}
                value={assignment.folder}
              >
                <option value="Announcement">Announcement</option>
                <option value="Course Material">Course Material</option>
                <option value="Assignment">Assignment</option>
              </select>
            </div>
            {assignment.folder === "Assignment" && (
              <div className="create-content">
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
            )}
          </div>
          {assignment.folder === "Assignment" && (
            <div
              className="create-content"
              style={{ display: "flex", alignItems: "center" }}
            >
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
          )}

          {assignment.folder !== "Announcement" && (
            <div className="create-content">
              <label>Upload a file</label>
              <input
                type="file"
                name="uploads"
                id="upload"
                onChange={handleFileInput}
              />
            </div>
          )}
          <div className="create-content">
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              placeholder="description"
              value={assignment.description}
              onChange={(e) => {
                setInputHeight(e, "200px");
                onChange(e);
              }}
            />
          </div>
          <button
            type="submit"
            className="createCourseContentBtn"
            disabled={isCreatingAssigment ? true : false}
          >
            {isCreatingAssigment ? <CircularProgress /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateCourseContent;

import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { RiAddBoxFill } from "react-icons/ri";
import CourseSidebar from "../components/CourseSidebar";
import CourseHeader from "../components/CourseHeader";
import { dateConversionNums } from "../utils/dateConversion";

function CourseMaterials() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const [courseMaterials, setCourseMaterials] = useState([]);

  useEffect(() => {
    getCourseInfo();
    getCourseMaterials();
  }, []);

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
      <div style= {{margin: "10px auto", display: "block"}} > 
        <div style={{margin: "10px auto", display: "block"}}>
          <h1 style={{ color: "black", paddingLeft: "10px" }}>
              {course.courseName}               
          </h1>
          <p>{course.description}</p>
          </div>
      </div>
      <CourseHeader currentActive={"Course Materials"} />

      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to={"/courses/" + courseId}>
            <h1 style={{ color: "black", paddingLeft: "10px" }}>
              {course.courseName}
            </h1>
          </Link>
          {user && user._id === course.creatorId && (
            <Link
              to={"/courses/" + courseId + "/create-content"}
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                color: "black",
              }}
            >
              <RiAddBoxFill size={40} />
            </Link>
          )}
        </div>


        <div style={{ display: "flex",  }}>
          <CourseSidebar currentActive={"Course Materials"} />
          <div
            style={{
              flex: "8",
              padding: "28px",
              fontSize: "20px",
              backgroundColor: "white",
              borderRadius: "15px",
              marginLeft: "10px"
            }}
          >
            <div style={{ display: "flex", marginBottom: "9px" }}>
              <div style={{ flex: "10", fontWeight: "bold", marginLeft: "10px" }}>Name</div>
              <div style={{ flex: "2", fontWeight: "bold", textAlign: "center" }}>Uploaded</div>
            </div>

            <hr style={{border: "1.5px solid black", borderRadius: "5px", marginBottom: "5px"}}></hr>

            {courseMaterials.map((material) => {
              const date = dateConversionNums(material.updatedAt);
              return (
                <>
                <Link
                  to={
                    "/courses/" + courseId + "/course-materials/" + material._id
                  }
                  key={material._id}
                  style={{
                    display: "flex",
                    padding: "15px 0px 15px 0px",
                    // borderBottom: "1px solid black",
                    fontSize: "20px",
                    color: "black",
                  }}
                >
                  <div style={{ flex: "10", fontSize: "18px", marginLeft: "10px"}}>{material.title}</div>
                  <div style={{ flex: "2", textAlign:"center", fontSize: "18px"}}>{date}</div>
                </Link>
                <hr style={{border: "1.5px solid #d6cfc5", borderRadius: "5px", marginBottom: "5px"}}></hr>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseMaterials;

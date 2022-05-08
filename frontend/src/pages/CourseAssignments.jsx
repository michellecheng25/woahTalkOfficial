import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { MdAddToPhotos } from "react-icons/md";
import CourseSidebar from "../components/CourseSidebar";
import { dateTimeConversion } from "../utils/dateConversion";
import CourseHeader from "../components/CourseHeader";
import {MdDelete} from "react-icons/md";

function CourseAssignments() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("token"));
  const [assignments, setCourseAssignments] = useState([]);

  useEffect(() => {
    getCourseInfo();
    getCourseAssignments();
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

  if (loading) return <div></div>;
  if (!user.courses.includes(courseId)) return <NotFound />;

  return (
    <div>
      <Navbar />
      <div style= {{margin: "25px auto", display: "flex", flexDirection: "column", width: "1000px",}} > 
        <div style= {{display: "flex", marginBottom: "4px"}}>
          <h1 style={{ color: "black", marginRight: "10px", fontSize: "48px"}}>
              {course.courseName}               
          </h1>
          {course.level === "novice" && <p style= {{backgroundColor: "#F8CB86", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>Novice</p>}
          {course.level === "intermediate" && <p style= {{backgroundColor: "#ECA645", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>Intermediate</p>}
          {course.level === "advanced" && <p style= {{backgroundColor: "#336D49", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>Advanced</p>}


          {course.language === "english" && <p style= {{backgroundColor: "#547DDE", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>English</p>}
          {course.language === "chinese" && <p style= {{backgroundColor: "#547DDE", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>Chinese</p>}
          {course.language === "french" && <p style= {{backgroundColor: "#547DDE", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>French</p>}
          {course.language === "spanish" && <p style= {{backgroundColor: "#547DDE", borderRadius: "10px", color: "white", padding: "7px 7px 7px 7px", height: "30px", fontSize: "14px", marginTop: "13px", marginRight: "10px"}}>Spanish</p>}

        </div>
       
        <p style= {{fontWeight: "normal"}}>{course.description}</p>
        <CourseHeader currentActive={"Assignments"} />

      {/* <div style={{  }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          
          
        </div> */}
        <div style={{ display: "flex" }}>
          {/* <CourseSidebar currentActive={"Assignments"} /> */}
          <div
            style={{
              flex: "8",
              fontSize: "20px",
            }}
          >
            
              {user && user._id === course.creatorId && (
            <Link
              to={"/courses/" + courseId + "/create-content"}
              style={{
                cursor: "pointer",
                color: "black",
              }}
            >
            <div style={{
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
              <div style={{display:"flex", }}>
              <div>
              <MdAddToPhotos size={30} style= {{marginLeft: "15px", color:"white"}}/>
              </div>
              <p style={{marginLeft: "10px", marginTop: "6px", color:"white"}}>Create a new assignment</p>
              </div>
              </div>
            </Link>
          )}
           
            <div style={{ display: "flex", marginTop: "20px", marginBottom: "4px" }}>
              <div style={{ flex: "6", fontWeight: "bold" }}>Name</div>
              <div style={{ flex: "2", fontWeight: "bold" }}>Due Date</div>
            </div>

            <hr style={{borderRadius: "10px", border: "1.5px solid black", marginBottom:"10px", backgroundColor:"#000000"}}/>

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
                  <div style={{ flex: "6", marginLeft: "15px"}}>{assignment.title}</div>
                  <div style={{ flex: "2" }}>{date} <MdDelete style={{color: "#336D49", marginLeft:"10px"}}/></div>
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

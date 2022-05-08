import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { RiAddBoxLine } from "react-icons/ri";
import { Button } from "@material-ui/core";
import { joinCourse, leaveCourse } from "../context/users/UserActions";
import CourseSidebar from "../components/CourseSidebar";
import Announcement from "../components/Announcement";
import { ReactComponent as Teaching } from "../assets/svg/undraw_teaching_re_g7e3.svg";
import CourseHeader from "../components/CourseHeader";
import Modal from "react-modal";
Modal.setAppElement("body");

//annoucements displayed
function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const { user, dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const isJoined = user.courses.includes(courseId);
  const [joined, setJoined] = useState(isJoined);
  const token = JSON.parse(localStorage.getItem("token"));
  const [courseAnnouncements, setCourseAnnouncements] = useState([]);

  useEffect(() => {
    getCourseInfo();
    getCourseAnnouncement();
  }, [joined]);

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

  const getCourseAnnouncement = async () => {
    await axios
      .get("/api/coursepage/" + courseId + "/announcements", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setCourseAnnouncements(response.data);
        console.log(response.data);
      })
      .catch(console.log);
  };

  const joinACourse = () => {
    const userAction = joined ? "leave" : "join";
    const action = {
      action: userAction,
    };
    console.log(action);

    axios
      .post("api/courses/" + courseId + "/join", action, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setJoined(!joined);
      })
      .catch(console.log);

    if (userAction === "join") joinCourse(courseId, dispatch);
    else leaveCourse(courseId, dispatch);
  };


  if (loading) return <div></div>;
  if (!course) return <NotFound />;

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

          {user &&
              user.role === "Student" && 
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    marginLeft: "auto",
                    cursor: "pointer",
                    marginRight: "20px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    height: "30px",
                    marginTop: "13px"
                  }}
                  onClick={joinACourse}
                >
                  {joined ? "Leave Course" : "Join Course"}
                </Button>
            }

        </div>
       
        <p style= {{fontWeight: "normal"}}>{course.description}</p>
        {isJoined && <CourseHeader currentActive={"Announcements"} />}

     

        {user &&
        user._id === course.creatorId ?
          (<Link
            to={"/courses/" + courseId + "/create-content"}
            style={{
              margin: "25px 0px 20px 0px",
              cursor: "pointer",
              color: "black",
              borderRadius: "10px", 
              border: "1px dashed black",
              height: "80px"
            }}
          >
            <div style= {{
              margin: "20px auto",
              display: "block",
              width: "fit-content",
              }}>
              <div style={{display: "flex"}}>
              <RiAddBoxLine size={30} style={{paddingTop: "5px"}} />
              <div style={{paddingLeft: "5px", paddingTop: "8px", fontWeight: "normal", letterSpacing: "1px"}}>Click here to make an annoucement</div>
              </div>
            
            </div>
          </Link> ): 
             (<div style={{marginTop:"25px"}}> </div>)
        
          }

            
        <div style={{ display: "flex" }}>
          {/* {isJoined && <CourseSidebar currentActive={"Announcements"} />} */}
          <div style={{ flex: "8"}}>
            {isJoined ? (
              <>
                {courseAnnouncements.map((announcement) => {
                  return (
                    <Announcement
                      key={announcement._id}
                      announcement={announcement}
                    />
                  );
                })}
              </>
            ) : (
              <>
                <Teaching style={{ margin: "0 auto", display: "block" }} />
                <p style={{ textAlign: "center" }}>
                  Join course to view course content
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;

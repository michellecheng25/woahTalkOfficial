import Navbar from "../components/Navbar";
import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import NotFound from "./NotFound";
import { MdNoteAdd } from "react-icons/md";
import {BsFileEarmarkPdf} from "react-icons/bs";
import CourseSidebar from "../components/CourseSidebar";
import CourseHeader from "../components/CourseHeader";
import { dateConversionNums } from "../utils/dateConversion";
import { Divider } from "@material-ui/core";
import {MdDelete} from "react-icons/md";


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
        <CourseHeader currentActive={"Course Materials"} />         
         {user && user._id === course.creatorId ? (
           <Link
             to={"/courses/" + courseId + "/create-content"}
             style={{
               marginRight: "auto",
               cursor: "pointer",
               color: "black",
               width: "33%", 
               display: "block", 
               marginTop: "25px",
               flexWrap: "wrap",
               marginBottom: "10px",

             }}
           >
             <div style={{backgroundColor:"#234831", height: "68px", borderRadius: "10px", padding: "5px", width: "324", border: "1px solid #234831", display: "flex"}}>
               <div style= {{marginTop: "10px"}}> <MdNoteAdd size={40} style= {{padding: "6px", color: "white", marginBottom: "0px !important"}} /> </div>
               <div style={{color: "white", fontWeight: "bold", marginTop: "21px"}}> Add a course file </div>
             </div>
           </Link>
         ):
             (<div style={{marginTop:"25px"}}> </div>)
         }

          <div style={{display: "flex", flexWrap: "wrap"}}>
            {courseMaterials.map((material) => {
              const date = dateConversionNums(material.updatedAt);
              return (
                <>
                <div style={{
                    fontSize: "20px",
                    color: "black",
                    width: "33%", 
                    display: "block", 
                    flexWrap: "wrap"
                  }}>
                <div style = {{fontSize: "18px",  borderRadius: "10px", padding: "6px", marginBottom:"10px", marginRight: "5px",
                    border: "1px solid black", maxHeight: "190px", backgroundColor: "#D7E0D5", display: "flex"}}>
                    {/* THERE ARE TWO LINK TO THE COURSE MATERIAL PAGE BECAUSE THE DELETE NEEDS TO BE TRIGGER TOO */}
                    <Link
                      to={
                        "/courses/" + courseId + "/course-materials/" + material._id
                      }
                      key={material._id}
                      style = {{color:"black"}}
                    > 
                      <div style={{marginTop: "14px", marginRight: "10px", paddingBottom: "4px", paddingLeft: "5px", marginBottom: "0px"}}>
                        <BsFileEarmarkPdf size={30}/>
                      </div>  
                    </Link> 
                    <div style={{marginTop: "10px", marginRight: "8px", fontWeight: "bold", width: "100%", }}>
                      <div style= {{display:"flex", marginRight: "0px", }}>
                        <div style={{flex: "8", textOverflow: "hidden", width: "80px", overflow: "hidden", whiteSpace: "nowrap"}}>
                          <Link
                              to={
                                "/courses/" + courseId + "/course-materials/" + material._id
                              }
                              key={material._id}
                              style={{color: "black"}}
                            > 
                            {material.title}  </Link>
                          </div>
                       
                        {user && user._id === course.creatorId && (
                          <div style={{flex: "2"}}> <MdDelete style={{color: "#336D49", marginLeft:"10px"}}/>
                        </div>)}
                      
                      </div> 
                      <p style={{fontSize: "13px",fontWeight: "normal", textAlign: "right", marginTop: "8px"}}>Uploaded on {date}</p>
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

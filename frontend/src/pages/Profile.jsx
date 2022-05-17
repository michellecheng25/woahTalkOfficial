import Navbar from "../components/Navbar";
import "./profile.css";
import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ConnectBtns from "../components/ConnectBtns";
import UserContext from "../context/users/UserContext";
import LanguageProgress from "../components/LanguageProgress";
import NotFound from "./NotFound";
import PostInput from "../components/PostInput";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import { FaChalkboardTeacher } from "react-icons/fa";

function Profile() {
  let { username } = useParams();

  const { user, isFetching } = useContext(UserContext);
  const [foundUser, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchUsers();
    fetchPosts();
    fetchCourses();
  }, [username, pageNumber]);

  const fetchUsers = async () => {
    await axios
      .get("/api/profiles/" + username)
      .then((response) => {
        setUser(response.data);
      })
      .catch(console.log);
    setIsLoading(false);
  };
  const fetchPosts = async () => {
    await axios
      .get(`/api/profiles/` + username + `/posts/?page=${pageNumber}`)
      .then((response) => {
        setPosts((prev) => {
          return [...prev, ...response.data];
        });
        setHasMore(response.data.length > 0);
      })
      .catch(console.log);
  };

  const fetchCourses = async () => {
    await axios
      .get(`/api/profiles/` + username + `/courses`)
      .then((response) => {
        setCourses(response.data.courses);
        console.log(response.data.courses);
      })
      .catch(console.log);
  };

  const resetFeed = () => {
    setPageNumber(1);
    setHasMore(false);
    setPosts([]);
    fetchPosts();
  };

  if (isLoading) return <div></div>;
  if (!foundUser && !isLoading) {
    return <NotFound />;
  }

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="profile-top">
          <img className="profile-cover" src={foundUser.coverPicture} />
          <img className="profile-user-img" src={foundUser.profilePicture} />
        </div>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-info">
              <div className="profile-left-top">
                <h1 className="user-name"> {foundUser.name}</h1>
                {user && user.username !== foundUser.username && (
                  <ConnectBtns
                    foundUser={foundUser}
                    followingList={user.following}
                  />
                )}
              </div>
              <div className="user-foreignName">{foundUser.foreignName}</div>
              <div className="user-bio">{foundUser.bio}</div>
              <LanguageProgress
                nativeLevel={foundUser.nativeProficiency}
                foreignLevel={foundUser.foreignProficiency}
                native={foundUser.nativeLanguage}
                foreign={foundUser.foreignLanguage}
              />

              {foundUser.role === "Teacher" && courses.length > 0 && (
                <div>
                  <h3 style={{ margin: "10px 0px" }}>
                    <FaChalkboardTeacher size={22} style={{ marginRight: "10px" }} />
                    Teaching
                  </h3>
                  {courses.map((course) => {
                    return (
                      <div 
                        style= {{ border: "1px solid black", 
                        padding: "7px",
                        margin: "5px 0px 8px",
                        // width: "200px",
                        fontSize: "15px",
                        borderRadius: "10px"}}
                        key={course._id}>
                        <Link to={"/courses/" + course._id}>
                          {course.courseName}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="profile-right">
            <div style={{ width: "680px", margin: "auto" }}>
              <div className="feed-container" style={{ feed }}>
                {user && user.username === username && (
                  <div style={form}>
                    <PostInput resetFeed={resetFeed} />
                  </div>
                )}
                <div className="postContainer">
                  <InfiniteScroll
                    dataLength={posts.length}
                    next={() => {
                      setPageNumber(pageNumber + 1);
                    }}
                    hasMore={hasMore}
                  >
                    {posts.map((post) => {
                      return (
                        <Post
                          key={post._id}
                          post={post}
                          setPosts={setPosts}
                          resetFeed={resetFeed}
                        />
                      );
                    })}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

const feed = {
  backgroundColor: "#F3EFE9",
  fontFamily: "Open Sans",
  height: "100vh",
};

const form = {
  position: "relative",
  margin: "auto",
  width: "100%",
  margin: "0px auto 20px auto",
  backgroundColor: "#f2f2f2",
  padding: "15px",
  borderRadius: "10px",
  float: "center",
  justifyContent: "center",
};

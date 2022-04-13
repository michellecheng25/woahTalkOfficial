import Navbar from "../components/Navbar";
import "./profile.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseBtns from "../components/ConnectBtns";
import UserContext from "../context/users/UserContext";
import LanguageProgress from "../components/LanguageProgress";
import NotFound from "./NotFound";
import PostInput from "../components/PostInput";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

function Profile() {
  let { username } = useParams();

  const { user, isFetching } = useContext(UserContext);
  const [foundUser, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    fetchUsers();
    fetchPosts();
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
      });
  };

  const createAPost = () => {
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
          <img className="profile-cover" src="https://picsum.photos/1200" />
          <img className="profile-user-img" src={foundUser.profilePicture} />
        </div>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-info">
              <div className="profile-left-top">
                <h1 className="user-name"> {foundUser.name}</h1>
                {user && user.username !== foundUser.username && (
                  <CourseBtns
                    foundUser={foundUser}
                    followingList={user.following}
                  />
                )}
              </div>
              <div className="user-foreignName">foreignName</div>
              <div className="user-bio">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </div>
              <LanguageProgress />
            </div>
          </div>
          <div className="profile-right">
            <div style={{ width: "680px", margin: "auto" }}>
              <div className="feed-container" style={{ feed }}>
                {user && user.username === username && (
                  <div style={form}>
                    <PostInput createAPost={createAPost} />
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
                        <Post key={post._id} post={post} setPosts={setPosts} />
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
  backgroundColor: "#E9E5DF",
  padding: "15px",
  borderRadius: "10px",
  float: "center",
  justifyContent: "center",
};

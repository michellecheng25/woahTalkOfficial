import Navbar from "../components/Navbar";
import "./profile.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseBtns from "../components/ConnectBtns";
import UserContext from "../context/users/UserContext";
import LanguageProgress from "../components/LanguageProgress";
import Feed from "../components/Feed";
import NotFound from "./NotFound";

function Profile() {
  let { username } = useParams();

  const { user, isFetching } = useContext(UserContext);
  const [foundUser, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currPost, setCurrPost] = useState({});

  useEffect(() => {
    fetchUsers();
    fetchPosts();
  }, [username, currPost]);

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
    await axios.get("/api/profiles/" + username + "/posts").then((response) => {
      setPosts(response.data);
    });
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
              <Feed posts={posts} setCurrPost={setCurrPost} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

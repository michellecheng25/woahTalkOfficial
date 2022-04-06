import Navbar from "../components/Navbar";
import "./profile.css";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CourseBtns from "../components/ConnectBtns";
import UserContext from "../context/users/UserContext";
import LanguageProgress from "../components/LanguageProgress";

function Profile() {
  let { username } = useParams();

  const [foundUser, setUser] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetchUsers();
  }, [username]);

  const fetchUsers = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/profiles/" + username
    );
    setUser(response.data);
  };

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
          <div className="profile-right">feed</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

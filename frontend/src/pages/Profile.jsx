import Navbar from "../components/Navbar";
import "./profile.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BsFillChatFill } from "react-icons/bs";

function Profile() {
  let { username } = useParams();

  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [username]);

  const fetchUsers = async () => {
    const response = await axios.get("/api/profiles/" + username);
    setUser(response.data);
  };

  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="profile-top">
          <img className="profile-cover" src="https://picsum.photos/1200" />
          <img className="profile-user-img" src={user.profilePicture} />
        </div>
        <div className="profile-content">
          <div className="profile-left">
            <div className="profile-left-top">
              <h1 className="user-name"> {user.name}</h1>
              <div className="connect_btn">
                <div>
                  <BsFillChatFill size={15} />
                </div>
                <div> Follow </div>
              </div>
            </div>
            <div className="user-foreignName">foreignName</div>
            <div className="user-bio">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </div>
            <div className="profile_language_info">
              <div className="language">
                Native
                <div className="level">
                  <div className="level-fill" style={{ width: "100%" }}></div>
                </div>
              </div>
              <div className="language">
                Foreign
                <div className="level">
                  <div className="level-fill" style={{ width: "100%" }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-right">feed</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import { Link, useNavigate } from "react-router-dom";
import "./userItem.css";
//import UserContext from "../context/users/UserContext";
//import { useContext } from "react";
import ConnectBtns from "./ConnectBtns";

function UserItem({ foundUser }) {
  //const { user } = useContext(UserContext);

  const userLink = "/profile/" + foundUser.username;
  const nativeLevel = "100%";
  const foreignLevel = "33%";

  return (
    <>
      <div className="profile-result-list-item">
        <div className="profile-img">
          <Link to={userLink}>
            <img src={foundUser.profilePicture} />
          </Link>
        </div>
        <Link to={userLink} className="profile_info">
          <div className="profile_title">
            <h1 className="profile_name">{foundUser.name}</h1>
            <h4 className="profile_foreignName">Foreign Name</h4>
          </div>
          <div className="profile_language_info">
            <div className="language">
              Native
              <div className="level">
                <div
                  className="level-fill"
                  style={{ width: nativeLevel }}
                ></div>
              </div>
            </div>
            <div className="language">
              Foreign
              <div className="level">
                <div
                  className="level-fill"
                  style={{ width: foreignLevel }}
                ></div>
              </div>
            </div>
          </div>
          <div className="profile_bio">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </Link>
        <ConnectBtns foundUser={foundUser.username} />
      </div>
    </>
  );
}

export default UserItem;

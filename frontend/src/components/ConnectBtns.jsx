import { BsFillChatFill } from "react-icons/bs";
import "./connectBtns.css";
import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import UserContext from "../context/users/UserContext";
import { unfollow, follow } from "../context/users/UserActions";
import { useNavigate } from "react-router-dom";
import {HiOutlineUserAdd} from "react-icons/hi";
import {HiOutlineUserRemove} from "react-icons/hi";


function ConnectBtns({ foundUser, followingList }) {
  const isfollowing = followingList.includes(foundUser._id);
  const [following, setFollowing] = useState(isfollowing);
  const token = JSON.parse(localStorage.getItem("token"));
  const { user, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const onFollow = async () => {
    const userAction = following ? "unfollow" : "follow";
    const followAction = {
      action: userAction,
    };
    console.log(followAction);
    axios
      .post("api/users/" + foundUser.username + "/follow", followAction, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        console.log(following);
        setFollowing(!following);
      })
      .catch((error) => toast.error(error.response.data));

    if (userAction === "follow") follow(foundUser._id, dispatch);
    else {
      unfollow(foundUser._id, dispatch);
    }
  };

  const onChat = async () => {
    try {
      await axios.post(
        "api/chat",
        { username: foundUser.username },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {foundUser._id !== user._id && (
        <div className="connect_btn">
          <div onClick={onChat}>
            <BsFillChatFill size={15} />
          </div>
          <div
            onClick={onFollow}
            style={{
              backgroundColor: following && "#547DDE",
              color: following && "white",
            }}
          >
            {following ? <HiOutlineUserRemove/> : <HiOutlineUserAdd/>}
          </div>
        </div>
      )}
    </>
  );
}

ConnectBtns.defaultProps = {
  followingList: [],
};

export default ConnectBtns;

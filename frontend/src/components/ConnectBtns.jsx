import { BsFillChatFill } from "react-icons/bs";
import "./connectBtns.css";
import { useState } from "react";

function ConnectBtns({ foundUser, followingList }) {
  let isfollowing = followingList.includes(foundUser._id);
  const [following, setFollowing] = useState(isfollowing);

  const onFollow = () => {
    setFollowing(!following);

    //TODO: follow and unfollow (updated db)
  };

  const onChat = () => {
    console.log("chat " + foundUser);
  };

  return (
    <>
      <div className="connect_btn">
        <div onClick={onChat}>
          <BsFillChatFill size={15} />
        </div>
        <div
          onClick={onFollow}
          style={{
            backgroundColor: following && "#1778F2",
            color: following && "white",
          }}
        >
          {following ? "Following" : "Follow"}
        </div>
      </div>
    </>
  );
}

ConnectBtns.defaultProps = {
  followingList: [],
};

export default ConnectBtns;

import { BsFillChatFill } from "react-icons/bs";
import "./connectBtns.css";
import { useContext } from "react";
import UserContext from "../context/users/UserContext";

function ConnectBtns({ foundUser }) {
  const { user } = useContext(UserContext);
  const onFollow = () => {
    console.log("follow " + foundUser);
  };

  const onChat = () => {
    console.log("chat " + foundUser);
  };

  return (
    <>
      {user && (
        <div className="connect_btn">
          <div onClick={onChat}>
            <BsFillChatFill size={15} />
          </div>
          <div onClick={onFollow}> Follow </div>
        </div>
      )}
    </>
  );
}

export default ConnectBtns;

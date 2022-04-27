import "./message.css";
import { format } from "timeago.js";
import { useState } from "react";

export default function Message({ message, currentUser, conversation, own }) {
  const [participant, setParticipant] = useState(
    conversation.members.find((member) => member._id !== currentUser._id)
  );

  return (
    <div className={own ? "message own" : "message"}>
      {own ? (
        <div className="messageTop">
          <p className="messageText">{message.text}</p>
          <img className="messagePfp" src={currentUser.profilePicture} alt="" />
        </div>
      ) : (
        <div className="messageTop">
          <img className="messagePfp" src={participant.profilePicture} alt="" />
          <p className="messageText"> {message.text}</p>
        </div>
      )}
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

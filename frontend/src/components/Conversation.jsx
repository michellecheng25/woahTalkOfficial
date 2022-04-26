import "./conversation.css";
import { useState, useEffect } from "react";

function Conversation({ conversation, CurrentUser }) {
  const [participant, setParticipant] = useState(
    conversation.members.find((member) => member._id !== CurrentUser._id)
  );

  return (
    <div className="conversation">
      <img
        className="conversationPfp"
        src={participant.profilePicture}
        alt="user-pfp"
      />
      <span className="conversationName">{participant.name}</span>
    </div>
  );
}

export default Conversation;

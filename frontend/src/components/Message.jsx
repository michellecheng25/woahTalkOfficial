import "./message.css";
import { format } from "timeago.js";

export default function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      {own ? (
        <div className="messageTop">
          <p className="messageText">{message.text}</p>
          <img
            className="messagePfp"
            src="https://pbs.twimg.com/media/EE7M3oeU0AAJGM_.jpg"
            alt=""
          />
        </div>
      ) : (
        <div className="messageTop">
          <img
            className="messagePfp"
            src={message.sender.profilePicture}
            alt=""
          />
          <p className="messageText"> {message.text}</p>
        </div>
      )}
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

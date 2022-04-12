import { Link } from "react-router-dom";
import "./comment.css";
import dateConversion from "../utils/dateConversion";

function Comment({ comment }) {
  const commentDate = dateConversion(new Date(comment.date));

  return (
    <div className="comment">
      <Link to={"/profile/" + comment.userId.username}>
        <img
          src={comment.userId.profilePicture}
          alt="profile-pic"
          className="profile-pic"
        />
      </Link>
      <div className="comment-box">
        <Link
          to={"/profile/" + comment.userId.username}
          className="comment-user"
        >
          {comment.userId.name}
        </Link>
        {"  "}
        &#183; {"  "}
        {commentDate}
        <div className="comment-text">{comment.comment}</div>
      </div>
    </div>
  );
}

export default Comment;

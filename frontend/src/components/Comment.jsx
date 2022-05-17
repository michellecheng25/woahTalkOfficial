import { Link, useParams } from "react-router-dom";
import "./comment.css";
import dateConversion from "../utils/dateConversion";
import { MdDelete } from "react-icons/md";
import { useState, useContext } from "react";
import UserContext from "../context/users/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

function Comment({ comment, setComments }) {
  const { user } = useContext(UserContext);
  const { postId } = useParams();
  const commentDate = dateConversion(new Date(comment.date));
  const token = JSON.parse(localStorage.getItem("token"));

  const onDelete = () => {
    console.log("delete comment");
    axios
      .delete("api/posts/" + postId + "/comment/" + comment._id, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setComments((prev) =>
          prev.filter((aComment) => aComment._id !== comment._id)
        );
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

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
        {user && user._id === comment.userId._id && (
          <MdDelete size={22} className="deleteComment" onClick={onDelete} />
        )}
        <div className="comment-text">{comment.comment}</div>
      </div>
    </div>
  );
}

export default Comment;

import "./commentInput.css";
import { BiSend } from "react-icons/bi";
import { useContext, useState, useRef } from "react";
import UserContext from "../context/users/UserContext";
import setInputHeight from "../utils/setInputHeight";
import axios from "axios";
import { toast } from "react-toastify";

function CommentInput({ postId, setUserComment }) {
  const { user } = useContext(UserContext);
  const comment = useRef();
  const token = JSON.parse(localStorage.getItem("token"));

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!comment.current.value) {
      toast.error("Add a comment");
      return;
    }

    try {
      await axios.post(
        "/api/posts/" + postId + "/comment",
        { comment: comment.current.value },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }

    setUserComment({ comment: comment.current.value });

    comment.current.value = "";
    comment.current.style.height = "20px";
  };

  return (
    <div className="create-comment">
      <img
        src={user.profilePicture}
        alt="profile-pic"
        className="profile-pic"
      />
      <form className="commentForm" onSubmit={submitHandler}>
        <textarea
          type="text"
          name="name"
          className="commentInput"
          placeholder="Add a comment..."
          onChange={(e) => setInputHeight(e, "20px")}
          ref={comment}
        />
        <button type="submit" value="Submit" className="commentSubmit">
          <BiSend size={22} />
        </button>
      </form>
    </div>
  );
}

export default CommentInput;

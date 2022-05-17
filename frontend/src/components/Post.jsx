import { useState, useContext } from "react";
import "./post.css";
import { Link, useNavigate } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { FaRegCommentAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import dateConversion from "../utils/dateConversion";
import { BiBorderRadius } from "react-icons/bi";

function Post({ post, resetFeed }) {
  const userLink = "/profile/" + post.userId.username;
  const postLink = "/posts/" + post._id;
  const { user } = useContext(UserContext);

  let isLiked = false;
  if (user) isLiked = post.likes.includes(user._id);
  const [like, setLike] = useState(isLiked);
  const token = JSON.parse(localStorage.getItem("token"));

  const navigate = useNavigate();

  const postDate = dateConversion(post.updatedAt);

  const onLike = () => {
    setLike(!like);
    likePost();
  };

  const likePost = () => {
    const userAction = like ? "unlike" : "like";
    const likeAction = {
      action: userAction,
    };
    console.log(likeAction);

    axios
      .post("api/posts/" + post._id + "/like", likeAction, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => toast.error(error.response.data));
  };

  const onDelete = (postId) => {
    console.log("delete postId: " + postId);
    axios
      .delete("api/posts/" + postId, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        resetFeed();
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data);
      });
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="user-info">
          <Link to={userLink} className="profile-pic">
            <img src={post.userId.profilePicture} alt="profile-pic" />
          </Link>
          <div>
            <Link to={userLink}>
              <h2 style= {{fontSize: "19px", color: "black !important",}}>{post.userId.username}</h2>
            </Link>
            <h4 style={{fontSize: "13px", fontWeight: "normal", marginTop: "3px"}}>{postDate}</h4>
          </div>

          {user && user._id === post.userId._id && (
            <MdDelete
              className="delete-post"
              size={23}
              onClick={() => {
                onDelete(post._id);
              }}
            />
          )}
        </div>

        <div className="content">
          <p style={{fontSize: "15px",}}>{post.post}</p>
          {post.upload && (
            <a href={post.upload} target="_blank">
              <img
                src={post.upload}
                alt="post image"
                style={{ marginTop: "15px" }}
              />
            </a>
          )}
        </div>
        <hr style={{border:"0.75px solid #b2b2b2", backgroundColor: "#495556", borderRadius: "10px"}}></hr>

        <div className="postInteractions">
          {user && (
            <div className="likeBtn" onClick={onLike}>
              {like ? <FcLike size={23} /> : <FcLikePlaceholder size={23} />}
            </div>
          )}

          <div
            className="commentBtn"
            onClick={() => {
              navigate(postLink);
            }}
          >
            <FaRegCommentAlt size={20} style={{marginBottom:"6px"}} />
          </div>
        </div>
      </div>
    </div>
  );
}

Post.defaultProps = {
  post: [],
  resetFeed: function () {},
};

export default Post;

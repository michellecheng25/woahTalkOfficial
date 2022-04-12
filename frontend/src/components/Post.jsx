import { useState, useContext } from "react";
import "./post.css";
import { Link, useNavigate } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { GoComment } from "react-icons/go";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function Post({ post }) {
  const userLink = "/profile/" + post.userId.username;
  const postLink = "/posts/" + post._id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const isLiked = post.likes.includes(user._id);
  const [like, setLike] = useState(isLiked);
  const token = JSON.parse(localStorage.getItem("token"));

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

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="user-info">
          <Link to={userLink} className="profile-pic">
            <img src={post.userId.profilePicture} alt="profile-pic" />
          </Link>
          <div>
            <h2>{post.userId.username}</h2> <h4>{post.updatedAt}</h4>
          </div>
        </div>

        <div className="content">
          <p>{post.post}</p>
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
        <div className="postInteractions">
          <div className="likeBtn" onClick={onLike}>
            {like ? <FcLike size={30} /> : <FcLikePlaceholder size={30} />}
          </div>

          <div
            className="commentBtn"
            onClick={() => {
              navigate(postLink);
            }}
          >
            <GoComment size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

Post.defaultProps = {
  post: [],
};

export default Post;

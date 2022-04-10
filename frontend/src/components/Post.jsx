import React from "react";
import "./post.css";
import { Link, useNavigate } from "react-router-dom";
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { GoComment } from "react-icons/go";

function Post({ post }) {
  const userLink = "/profile/" + post.userId.username;
  const postLink = "/posts/" + post._id;
  const navigate = useNavigate();
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
          <div className="likeBtn">
            <FcLike size={30} />
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

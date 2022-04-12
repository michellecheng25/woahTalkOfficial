import Navbar from "../components/Navbar";
import NotFound from "./NotFound";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/users/UserContext";
import Post from "../components/Post";
import CommentInput from "../components/CommentInput";
import Comment from "../components/Comment";

function PostPage() {
  const { user } = useContext(UserContext);
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [userComment, setUserComment] = useState({});

  useEffect(() => {
    fetchPost();
  }, [postId, userComment]);

  const fetchPost = async () => {
    await axios
      .get("/api/posts/" + postId)
      .then((response) => {
        setPost(response.data);
      })
      .catch(console.log);

    setIsLoading(false);
  };

  if (isLoading) return <div></div>;
  if (!post && !isLoading) {
    return <NotFound />;
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          maxWidth: "680px",
          margin: "0 auto",
          marginTop: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Post post={post} />
        {user && (
          <CommentInput postId={postId} setUserComment={setUserComment} />
        )}
        {post.comments.map((comment) => {
          return <Comment key={comment._id} comment={comment} />;
        })}
      </div>
    </div>
  );
}

export default PostPage;

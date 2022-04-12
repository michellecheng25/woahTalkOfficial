import PostInput from "./PostInput";
import Post from "./Post";

function Feed({ posts, setCurrPost }) {
  //console.log(posts);
  return (
    <div className="feed-container" style={{ feed }}>
      <div style={form}>
        <PostInput setCurrPost={setCurrPost} />
      </div>
      <div className="postContainer">
        {posts.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
}

Feed.defaultProps = {
  posts: [],
};

export default Feed;

const feed = {
  backgroundColor: "#F3EFE9",
  fontFamily: "Open Sans",
  height: "100vh",
};

const form = {
  position: "relative",
  margin: "auto",
  width: "100%",
  margin: "0px auto 20px auto",
  backgroundColor: "#E9E5DF",
  padding: "15px",
  borderRadius: "10px",
  float: "center",
  justifyContent: "center",
};

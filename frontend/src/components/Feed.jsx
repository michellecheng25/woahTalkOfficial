//TODO: DELETE THIS FILE
import PostInput from "./PostInput";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";

function Feed({ posts, setCurrPost, getNextPage, hasMore }) {
  //console.log(posts);
  return (
    <div className="feed-container" style={{ feed }}>
      <div style={form}>
        <PostInput setCurrPost={setCurrPost} />
      </div>
      <div className="postContainer">
        <InfiniteScroll
          dataLength={posts.length}
          next={() => {
            getNextPage();
          }}
          hasMore={hasMore}
        >
          {posts.map((post) => {
            return <Post key={post._id} post={post} />;
          })}
        </InfiniteScroll>
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

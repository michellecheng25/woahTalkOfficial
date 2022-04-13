import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import PostInput from "../components/PostInput";
import Post from "../components/Post";
import InfiniteScroll from "react-infinite-scroll-component";

function Home() {
  const [posts, setPosts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getTimelinePosts();
  }, [pageNumber]);

  const getTimelinePosts = async () => {
    try {
      const timelinePosts = await axios.get(`/api/posts/?page=${pageNumber}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => {
        return [...prev, ...timelinePosts.data];
      });
      setHasMore(timelinePosts.data.length > 0);

      console.log(timelinePosts.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const createAPost = () => {
    setPageNumber(1);
    setHasMore(false);
    setPosts([]);
    getTimelinePosts();
  };

  return (
    <>
      <Navbar />
      <div style={{ width: "680px", margin: "30px auto 0px auto" }}>
        <div className="feed-container" style={{ feed }}>
          <div style={form}>
            <PostInput createAPost={createAPost} />
          </div>
          <div className="postContainer">
            <InfiniteScroll
              dataLength={posts.length}
              next={() => {
                setPageNumber(pageNumber + 1);
              }}
              hasMore={hasMore}
            >
              {posts.map((post) => {
                return <Post key={post._id} post={post} />;
              })}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

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

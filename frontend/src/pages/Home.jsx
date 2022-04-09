import Navbar from "../components/Navbar";
import Feed from "../components/Feed";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getTimelinePosts();
  }, []);

  const getTimelinePosts = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const timelinePosts = await axios.get("/api/posts/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(timelinePosts.data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Navbar />
      <div style={{ width: "680px", margin: "30px auto 0px auto" }}>
        <Feed posts={posts} />
      </div>
    </>
  );
}

export default Home;

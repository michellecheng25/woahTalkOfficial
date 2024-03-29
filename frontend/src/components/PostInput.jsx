import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import "./postInput.css";
import { useContext, useState, useRef } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import uploadFile from "../utils/uploadFile";
import setInputHeight from "../utils/setInputHeight";
import CircularProgress from "@mui/material/CircularProgress";

function PostInput({ resetFeed }) {
  const { user } = useContext(UserContext);
  const content = useRef();
  const [file, setFile] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const token = JSON.parse(localStorage.getItem("token"));

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    if (!content.current.value && !file) {
      toast.error("Submit something");
      return;
    }

    let fileUrl;
    if (file) {
      fileUrl = await uploadFile(file, token);
    }

    const newPost = {
      ...(content.current.value != "" && { post: content.current.value }),
      ...(fileUrl && { upload: fileUrl }),
    };
    console.log(newPost);

    try {
      await axios.post("/api/posts", newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log(error);
    }

    resetFeed();

    content.current.value = "";
    setFile("");
    content.current.style.height = "50px";
    setIsPosting(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
  };

  return (
    <>
      <form className="formContent" onSubmit={submitHandler}>
        <textarea
          name="content"
          placeholder="Share your recent language experience..."
          className="postInput"
          onChange={(e) => setInputHeight(e, "50px")}
          ref={content}
        />

        {file && (
          <img
            src={file}
            alt="chosen image"
            style={{
              maxHeight: "300px",
              maxWidth: "650px",
              objectFit: "cover",
            }}
          />
        )}

        <div>
          <label htmlFor="file" className="leftBtn">
            <MdOutlineAddPhotoAlternate size={24} style={{marginTop: "10px"}}/>
            <input
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
          </label>
          <div className="submitPost">
            {isPosting ? (
              <CircularProgress />
            ) : (
              <button type="submit" className="postBtn">
                <BiSend size={22} style={{marginTop: "11px"}}/>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

export default PostInput;

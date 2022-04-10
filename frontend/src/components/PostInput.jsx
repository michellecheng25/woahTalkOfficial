import { BiImageAdd } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import "./postInput.css";
import { useContext, useState, useRef } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

function PostInput() {
  const { user } = useContext(UserContext);
  const content = useRef();
  const [file, setFile] = useState("");
  //const [fileUrl, setFileURL] = useState("");

  const setInputHeight = (element, defaultHeight) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = defaultHeight;
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const token = JSON.parse(localStorage.getItem("token"));

  const submitHandler = async (e) => {
    e.preventDefault();
    //console.log(content.current.value, file);

    if (!content.current.value && !file) {
      toast.error("Submit something");
      return;
    }

    if (file) {
      await uploadImage(file);
    } else {
      console.log("create 1");
      createPost();
    }

    //content.current.value = "";

    //setFile("");
  };

  const createPost = async (fileUrl) => {
    const newPost = {
      ...(content.current.value != "" && { post: content.current.value }),
      ...(fileUrl !== "" && { upload: fileUrl }),
    };

    console.log(newPost);

    try {
      await axios.post("/api/posts", newPost, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("why?");
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (base64EncodedImage) => {
    await axios
      .post("/api/uploads", JSON.stringify({ data: base64EncodedImage }), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        //setFileURL(response.data);
        //console.log(fileUrl);
        createPost(response.data);
      })
      .catch(() => {
        console.log();
      });
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    console.log(file);
    previewFile(file);
  };

  const previewFile = (file) => {
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
            <BiImageAdd size={30} />
            <input
              type="file"
              id="file"
              accept=".png,.jpeg,.jpg"
              onChange={handleFileInput}
              style={{ display: "none" }}
            />
          </label>
          <button className="submitPost" type="submit">
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </>
  );
}

export default PostInput;

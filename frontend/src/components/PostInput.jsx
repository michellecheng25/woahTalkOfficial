import { BiImageAdd } from "react-icons/bi";
import { MdSend } from "react-icons/md";
import "./postInput.css";

function PostInput() {
  const setInputHeight = (element, defaultHeight) => {
    if (element) {
      const target = element.target ? element.target : element;
      target.style.height = defaultHeight;
      target.style.height = `${target.scrollHeight}px`;
    }
  };
  return (
    <>
      <form className="formContent">
        <textarea
          name="content"
          placeholder="Share your recent language experience..."
          className="postInput"
          onChange={(e) => setInputHeight(e, "50px")}
        />

        <div>
          <button className="leftBtn">
            <BiImageAdd size={30} />
          </button>
          <button className="submitPost">
            <MdSend size={30} />
          </button>
        </div>
      </form>
    </>
  );
}

export default PostInput;

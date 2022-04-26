import Navbar from "../components/Navbar";
import "./messageScreen.css";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";

function MessageScreen() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { user } = useContext(UserContext);
  const scrollRef = useRef();
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    getConversations();
  }, []);

  const getConversations = async () => {
    try {
      const res = await axios.get("/api/chat", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setConversations(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMessages = async (conversation) => {
    console.log(conversation);
    setCurrentChat(conversation._id);
    try {
      const res = await axios.get(
        "/api/chat/" + conversation._id + "/messages",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      conversationId: currentChat,
      sender: user._id,
      text: newMessage,
    };

    try {
      const res = await axios.post(
        `api/chat/${currentChat}/messages`,
        message,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => getMessages(conversation)}
              >
                <Conversation conversation={conversation} CurrentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => {
                    return (
                      <div ref={scrollRef}>
                        <Message
                          key={message._id}
                          message={message}
                          own={message.sender._id === user._id}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatBoxInput"
                    placeholder="write something here..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatBoxSubmit" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <h3 className="noConvoText">Start a conversation!</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MessageScreen;

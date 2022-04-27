import Navbar from "../components/Navbar";
import "./messageScreen.css";
import Conversation from "../components/Conversation";
import Message from "../components/Message";
import { useState, useEffect, useContext, useRef } from "react";
import UserContext from "../context/users/UserContext";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { io } from "socket.io-client";

function MessageScreen() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(UserContext);
  const scrollRef = useRef();
  const token = JSON.parse(localStorage.getItem("token"));
  const socket = useRef();

  useEffect(() => {
    if (!socket.current) socket.current = io(baseUrl);

    if (socket.current) {
      socket.current.emit("addUser", user._id);
    }

    socket.current.on("getMessage", (data) => {
      console.log("setting arrival message");
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    getConversations();
  }, []);

  useEffect(() => {
    console.log("arrival");

    if (arrivalMessage && currentChat) {
      for (const [index, member] of Object.entries(currentChat.members)) {
        console.log(member);

        if (member._id === arrivalMessage.sender) {
          console.log("new message");
          console.log(arrivalMessage);
          setMessages((prev) => {
            return [...prev, arrivalMessage];
          });
        }
      }
    }
  }, [arrivalMessage, currentChat]);

  //console.log(messages);

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
    setCurrentChat(conversation);
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
    if (newMessage.trim().length > 0) {
      const message = {
        conversationId: currentChat._id,
        sender: user._id,
        text: newMessage,
      };

      console.log("find reciever");
      console.log(currentChat.members);

      const reciever = currentChat.members.find(
        (member) => member._id !== user._id
      );

      console.log(reciever);

      socket.current.emit("sendMessage", {
        senderId: user._id,
        recieverId: reciever._id,
        text: newMessage,
      });

      try {
        const res = await axios.post(
          `api/chat/${currentChat._id}/messages`,
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
            {conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => getMessages(conversation)}
              >
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  currentUser={user}
                />
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
                      <div ref={scrollRef} key={message._id}>
                        <Message
                          key={message._id}
                          message={message}
                          conversation={currentChat}
                          currentUser={user}
                          own={message.sender === user._id}
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

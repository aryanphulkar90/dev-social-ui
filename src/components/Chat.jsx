import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [isTyping, setIsTyping] = useState(false)
  const { mySocket, messages } = useSocket({ targetUserId, setIsTyping });
  const lastTimeRef = useRef(0);
  const scrollRef = useRef(null)
  
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behaviour : "smooth"})
  },[messages])

  const sendMessage = () => {
    mySocket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) dateString = new Date();

    const now = new Date();
    const past = new Date(dateString);

    const diffInSeconds = Math.floor((now - past) / 1000);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInSeconds < 3600) {
      const mins = Math.floor(diffInSeconds / 60);
      return `${mins}m ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours}h ago`;
    } else {
      return past.toLocaleDateString();
    }
  };

  const handleTyping = () => {
    const now = Date.now();
    if (now - lastTimeRef.current > 3000) {
      mySocket.emit("typing", { userId, targetUserId });
      lastTimeRef.current = now;
    }
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 h-[70vh] m-5 flex flex-col">
      <div className="border-b border-gray-600 p-5 text-center">
        <h1>{"Chat " + 
          ((isTyping) ? "(Typing...)" : "")
        }</h1>
      </div>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              ref={scrollRef}
              key={index}
              className={
                "chat " +
                (user.firstName === msg?.firstName ? "chat-end" : "chat-start")
              }

            >
              <div className="chat-header">
                {msg?.firstName}
                <time className="text-xs opacity-50">
                  {getTimeAgo(msg?.updatedAt)}
                </time>
              </div>
              <div className="chat-bubble">{msg?.text}</div>
              <div className="chat-footer opacity-50">
                {user.firstName === msg?.firstName
                  ? msg?.seen
                    ? "Seen"
                    : "Delivered"
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-600 flex p-5">
        <input
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          className="border border-gray-600 flex-1 m-1 p-2"
        />
        <button className="m-1 p-2 btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

import axios from "axios";
import { baseURL } from "../utils/constansts";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSocketConnection } from "../utils/socket";
import { useRef } from "react";

const useSocket = ({ targetUserId, setIsTyping }) => {
  const [mySocket, setMySocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const typingTimeoutRef = useRef(null);
  const fetchChatMessages = async () => {
    const chat = await axios.get(baseURL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat);

    const chatMessages = chat?.data?.messages.map((msg) => {
      console.log(msg);
      const { senderId, text, updatedAt, _id, seen } = msg;
      return {
        firstName: senderId?.firstName,
        text,
        updatedAt,
        _id,
        seen,
      };
    });

    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const newSocket = createSocketConnection();
    setMySocket(newSocket);
    newSocket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    newSocket.on("typing", ({ typerId }) => {
      if (typerId === userId) return;
      setIsTyping(true);
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 3000);
    });

    newSocket.on("messageReceived", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      if (msg.firstName != user.firstName) {
        newSocket.emit("messageSeen", {
          userId,
          targetUserId,
        });
      }
    });

    newSocket.emit("messageSeen", {
      userId,
      targetUserId,
    });

    const handleSeen = ({ readerId }) => {
      if (readerId === userId) return;
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({ ...msg, seen: true }))
      );
    };

    newSocket.on("messageSeen", handleSeen);

    return () => {
      newSocket.disconnect();
    };
  }, [userId, targetUserId]);

  return { mySocket, messages };
};

export default useSocket;

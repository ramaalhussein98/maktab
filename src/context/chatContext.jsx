import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import myAxios from "../api/myAxios";

// import { useAxiosConfig } from "./AxiosContext ";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // const { axiosConfig } = useAxiosConfig();
  // const myAxios = axios.create(axiosConfig);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [recipientId, setRecipientId] = useState();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const numberedUserId = localStorage.getItem("userId");
  const userId = numberedUserId && Number(numberedUserId);
  const [isUserSelected, setIsUserSelected] = useState(false);

  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [isSendMessage, setIsSendMessage] = useState();
  const [file, setFile] = useState();
  const [fileData, setFileData] = useState();
  const [contacts, setContacts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [messagesCounter, setMessagesCounter] = useState(null);
  const [showMessages, setShowMessages] = useState(false);
  const [isDashboardForContacts, setIsDashboardForContacts] = useState(true);
  const [userKlickedData, setUserKlickedData] = useState(null);

  useEffect(() => {
    // if (isDashboardForContacts) return;
    setIsLoading(true);
    const token = localStorage.getItem("user_token");
    const getData = async () => {
      const res = await myAxios.get(`/api/chat/getContacts`);
      if (res.data.status === 1) {
        setIsLoading(false);
        setContacts(res.data?.contacts);
        setMessagesCounter(res.data?.total_unSeen_count);
        // setIsLoadingData(false);
      } else if (
        res.data.status === 0 &&
        res.data.message === "401 Unauthorized"
      ) {
        // setIsLoadingData(false);
        toast.error(
          lang === "ar"
            ? "غير مصرح، يرجى تسجيل الدخول"
            : "unauthorized, please login again"
        );
        setIsLoading(false);
        localStorage.removeItem("user_token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        localStorage.removeItem("userMembership");
        localStorage.removeItem("userData");
        nav("/");
      }
    };
    token && getData();
  }, [showMessages, isDashboardForContacts]);
  // this comment i will remove it after
  // useEffect(() => {
  //   if (socket !== null) return;

  //   if (userId) {
  //     const newSocket = io("https://socket.aqartik.com:443");
  //     setSocket(newSocket);
  //     return () => {
  //       newSocket.disconnect();
  //     };
  //   }
  // }, [userId]);

  useEffect(() => {
    if (socket === null) return;
    socket && socket.emit("addNewUser", Number(userId));
  }, [socket]);

  //send message
  useEffect(() => {
    if (socket === null) return;

    const currentDate = new Date(); // Get the current date

    socket.emit("sendMessage", {
      message: message,
      senderId: Number(userId),
      recipientId: Number(recipientId),
      fileData,
      created_at: currentDate,
    });
    setMessage("");
    setMessages((prev) => [
      ...prev,
      {
        message: message,
        recipientId: Number(recipientId),
        senderId: Number(userId),
        fileData,
        created_at: currentDate,
      },
    ]);
  }, [isSendMessage]);

  //recieve messages
  useEffect(() => {
    if (socket === null || !socket?.connected) return;

    // Listen for "getMessage" event
    const handleMessage = (res) => {
      const isInChat = Number(userKlickedData.id) === Number(res.senderId);

      if (isInChat) {
        setMessages((prev) => [...prev, res]);
      }
    };

    socket.off("getMessage"); // Remove previous event listener
    socket.on("getMessage", handleMessage); // Set up new event listener
  }, [userKlickedData, socket]);

  useEffect(() => {
    if (!recipientId) return;
    const formData = new FormData();
    formData.append("contact_id", recipientId);

    fetch("https://dashboard.aqartik.com/api/chat/getContactMessages", {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("user_token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => setMessages(data.messages))
      .catch((error) => console.error("Error:", error));
  }, [recipientId, isUserSelected]);

  useEffect(() => {
    if (!isUserSelected) return;
    if (userKlickedData === null) {
      const getData = async () => {
        const res = await myAxios.get(`/api/chat/getContacts`);

        const contacts = res?.data?.contacts;
        const foundUser = contacts?.find(
          (user) => Number(user?.id) === Number(recipientId)
        );

        if (foundUser) {
          // The user with the target user ID was found
          setUserKlickedData(foundUser);
        } else {
          // // The user with the target user ID was not found
        }
      };
      getData();
    } else {
      // console.log("no");
    }
  }, [isUserSelected]);

  return (
    <ChatContext.Provider
      value={{
        isUserSelected,
        setIsUserSelected,
        socket,
        messages,
        message,
        setMessage,
        recipientId,
        setRecipientId,
        setIsSendMessage,
        file,
        setFile,
        userKlickedData,
        setUserKlickedData,
        fileData,
        setFileData,
        setIsChatOpen,
        contacts,
        isLoading,
        messagesCounter,
        showMessages,
        setShowMessages,
        setIsDashboardForContacts,
        setContacts,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;

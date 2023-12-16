import React, { useContext, useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { useMediaQuery } from "@mui/material";
import ChatContext from "../../context/chatContext";
import { useTranslation } from "react-i18next";
// import { useAxiosConfig } from "../../context/AxiosContext ";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { ChatDialogStyle } from "../../mainComponents/MainPageStyles";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { LogoBig } from "../../assets/logos";
import myAxios from "../../api/myAxios";
const Layout = ({ children }) => {
  const location = useLocation();
  const { isUserSelected, setIsUserSelected } = useContext(ChatContext);
  const isMapPage = location.pathname.includes("map");
  const HomePage = location.pathname === "/";
  const isMediumScreen = useMediaQuery("(max-width:900px)") && !HomePage;
  return (
    <div>
      <TopNav setIsUserSelected={setIsUserSelected} />
      <main>{children}</main>
      {!isMapPage && !isMediumScreen ? <Footer /> : ""}
      {isUserSelected && <ChatDialog setIsUserSelected={setIsUserSelected} />}
    </div>
  );
};
const ChatDialog = () => {
  const {
    message,
    setMessage,
    socket,
    messages,
    setIsUserSelected,
    setIsSendMessage,
    recipientId,
    file,
    setFile,
    userKlickedData,
    setUserKlickedData,
    fileData,
    setFileData,
    setRecipientId,
  } = useContext(ChatContext);
  const nav = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const fileInputRef = useRef(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isActionsHide, setIsActionHide] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));
  // const { axiosConfig } = useAxiosConfig();
  // const myAxios = axios.create(axiosConfig);
  useEffect(() => {
    if (!!message || !!file) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [message, file]);

  const handleSend = async () => {
    let formData = new FormData();
    formData.append("message", message);
    formData.append("to_user_id", recipientId);
    formData.append("file", file);
    setIsSendMessage((prev) => !prev);
    const token = localStorage.getItem("user_token");
    const res = await axios.post(
      `https://dashboard.aqartik.com/api/chat/sendMessage`,
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.data.status === 1) {
      formData = new FormData();
      cancelSelectedFile();
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
      localStorage.removeItem("user_token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userMembership");
      localStorage.removeItem("userData");
      nav("/");
    } else {
    }
  };

  const handleAttachFile = () => {
    fileInputRef.current.click();
  };

  const cancelSelectedFile = () => {
    setFile(null);
    setFileData(null);
  };

  function createBlobUrl(base64Data, contentType) {
    // Extract base64-encoded data from the data URL
    const cleanedBase64Data = base64Data.split(",")[1];
    const byteCharacters = atob(cleanedBase64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return URL.createObjectURL(blob);
  }

  const handleAcceptInvite = async (user_id, message_id) => {
    await myAxios.get(
      `/api/user/invitation_action?status=accept&user_id=${user_id}&message_id=${message_id}`
    );
    setIsActionHide(true);
  };

  const handleDenyInvite = () => {
    setIsActionHide(true);
  };
  const chatContainerRef = useRef();

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <ChatDialogStyle $dir={lang}>
      <header>
        <div className="header-data">
          <img
            style={{
              objectPosition: "center",
            }}
            src={
              LogoBig
              // userKlickedData?.image?.name
              //   ? `https://dashboard.aqartik.com/assets/images/users/logo/${userKlickedData?.image?.name}`
              //   : "https://dashboard.aqartik.com/assets/images/users/logo/avatar.png"
            }
            alt=""
          />
          <span>
            {/* {userKlickedData?.username} */}
            maktab
          </span>
        </div>
        <CloseRoundedIcon
          className="close-icon"
          onClick={() => {
            setIsUserSelected(false);
            setUserKlickedData(null);
            setRecipientId(null);
          }}
        />
      </header>

      <main ref={chatContainerRef}>
        {messages &&
          messages.map((ele, i) => {
            // Calculate the time difference
            const backendDate = new Date(ele.created_at); // Assuming createdAt holds the message's creation date
            const currentDate = new Date();
            const timeDifference = currentDate - backendDate;
            const secondsDifference = Math.floor(timeDifference / 1000);

            let timeAgo;
            if (secondsDifference < 60) {
              timeAgo =
                lang === "en"
                  ? `${secondsDifference} seconds ago`
                  : `${secondsDifference} ثانية مضت`;
            } else if (secondsDifference < 3600) {
              const minutes = Math.floor(secondsDifference / 60);
              timeAgo =
                lang === "en"
                  ? `${minutes} minutes ago`
                  : `${minutes} دقيقة مضت`;
            } else if (secondsDifference < 86400) {
              const hours = Math.floor(secondsDifference / 3600);
              timeAgo =
                lang === "en" ? `${hours} hours ago` : `${hours} ساعة مضت`;
            } else {
              const days = Math.floor(secondsDifference / 86400);
              timeAgo = lang === "en" ? `${days} days ago` : `${days} يوم مضى`;
            }
            return (
              <div
                className={`message-container ${
                  Number(ele?.senderId) === Number(user?.id) ||
                  Number(Number(ele?.from_id)) === Number(user?.id)
                    ? "send-container"
                    : "recieve-container"
                }`}
                key={i}
              >
                {/* <div style={{ display: "flex", flexDirection: "column" }}>
                  {ele.type === "normal" ? (
                    <>
                      <div
                        className={`message ${
                          Number(ele?.senderId) === Number(user?.id) ||
                          Number(ele?.from_id) === Number(user?.id)
                            ? "sended-message"
                            : "recieved-message"
                        }`}
                      >
                        <p>{ele?.message || ele.body}</p>

                        {ele?.fileData && (
                          <a
                            style={{
                              textDecoration: "none",
                              color: "white",
                              backgroundColor: "rgba(200,200,200,.5)",
                              padding: "8px 4px",
                              borderRadius: "8px",
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                              marginTop: ".5rem",
                            }}
                            href={createBlobUrl(
                              ele.fileData.fileData,
                              "application/pdf"
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={ele.fileData.fileName}
                          >
                            <span>{ele.fileData.fileName}</span>
                            <DownloadingIcon />
                          </a>
                        )}
                        {ele?.attachment && (
                          <a
                            style={{
                              textDecoration: "none",
                              color: "black",
                              backgroundColor: "rgba(200,200,200,.5)",
                              padding: "8px 4px",
                              borderRadius: "8px",
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                              marginTop: ".5rem",
                            }}
                            href={`https://dashboard.aqartik.com/assets/chat/attachment/${ele.attachment}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            // download
                          >
                            <span>{ele.attachment}</span>
                            <DownloadingIcon />
                          </a>
                        )}
                      </div>
                      <span
                        style={{
                          alignSelf:
                            Number(ele?.senderId) === Number(user?.id) ||
                            Number(ele?.from_id) === Number(user?.id)
                              ? "flex-start"
                              : "flex-end",
                          fontSize: "12px",
                          padding: "2px",
                        }}
                      >
                        {timeAgo}
                      </span>
                    </>
                  ) : ele.type === "action" ? (
                    <div class="customized-msg">
                      <div class="message custom-message">
                        <p>
                          {" "}
                          {lang === "ar"
                            ? `تمت دعوتك من قبل ${
                                JSON.parse(ele?.body).username
                              }`
                            : `You've been invited by ${
                                JSON.parse(ele?.body).username
                              }`}
                        </p>
                      </div>
                      <div class="msg-btns-con">
                        {isActionsHide ? (
                          ""
                        ) : (
                          <>
                            <a
                              onClick={() =>
                                handleAcceptInvite(
                                  JSON.parse(ele.body).user_id,
                                  ele.id
                                )
                              }
                              class="msg-btn btn-success"
                            >
                              {lang === "ar" ? "أوافق" : "accept"}
                            </a>
                            <a
                              onClick={handleDenyInvite}
                              class="msg-btn btn-deny"
                            >
                              {lang === "ar" ? "رفض" : "deny"}
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  ) : ele.type === "html" ? (
                    <>
                      <div
                        className={`message ${
                          Number(ele?.senderId) === Number(user?.id) ||
                          Number(ele?.from_id) === Number(user?.id)
                            ? "sended-message"
                            : "recieved-message"
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: ele.body,
                        }}
                      ></div>
                      <span
                        style={{
                          alignSelf:
                            Number(ele?.senderId) === Number(user?.id) ||
                            Number(ele?.from_id) === Number(user?.id)
                              ? "flex-start"
                              : "flex-end",
                          fontSize: "12px",
                          padding: "2px",
                        }}
                      >
                        {timeAgo}
                      </span>
                    </>
                  ) : (
                    <>
                      <div
                        className={`message ${
                          Number(ele?.senderId) === Number(user?.id) ||
                          Number(ele?.from_id) === Number(user?.id)
                            ? "sended-message"
                            : "recieved-message"
                        }`}
                      >
                        <p>{ele?.message || ele.body}</p>

                        {ele?.fileData && (
                          <a
                            style={{
                              textDecoration: "none",
                              color: "black",
                              backgroundColor: "rgba(200,200,200,.5)",
                              padding: "8px 4px",
                              borderRadius: "8px",
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                              marginTop: ".5rem",
                            }}
                            href={createBlobUrl(
                              ele.fileData.fileData,
                              "application/pdf"
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={ele.fileData.fileName}
                          >
                            <span>{ele.fileData.fileName}</span>
                            <DownloadingIcon />
                          </a>
                        )}
                        {ele?.attachment && (
                          <a
                            style={{
                              textDecoration: "none",
                              color: "white",
                              backgroundColor: "rgba(200,200,200,.5)",
                              padding: "8px 4px",
                              borderRadius: "8px",
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                              marginTop: ".5rem",
                            }}
                            href={`https://dashboard.aqartik.com/assets/chat/attachment/${ele.attachment}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            // download
                          >
                            <span>{ele.attachment}</span>
                            <DownloadingIcon />
                          </a>
                        )}
                      </div>
                      <span
                        style={{
                          alignSelf:
                            Number(ele?.senderId) === Number(user?.id) ||
                            Number(ele?.from_id) === Number(user?.id)
                              ? "flex-start"
                              : "flex-end",
                          fontSize: "12px",
                          padding: "2px",
                        }}
                      >
                        {timeAgo}
                      </span>
                    </>
                  )}
                </div> */}
                {/* {!(ele?.socketID == socket?.id) && (
              <img src={userData?.image?.name} alt="" />
            )} */}
              </div>
            );
          })}
      </main>

      <footer>
        {file && (
          <div className="selected-file">
            <span>{file?.name}</span>
            <ClearIcon onClick={cancelSelectedFile} />
          </div>
        )}
        <div className="footer-container">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            rows={"1"}
            placeholder={lang === "ar" ? "رسالتك هنا..." : "your text here..."}
          ></textarea>
          <button>
            <AttachFileIcon onClick={handleAttachFile} />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              // Handle the selected file
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              const reader = new FileReader();
              reader.onload = (fileEvent) => {
                const fileData = fileEvent.target.result;
                const fileInfo = { fileName: selectedFile.name, fileData };
                setFileData(fileInfo);
              };
              reader.readAsDataURL(selectedFile);
            }}
          />
          <button onClick={handleSend} disabled={isDisabled}>
            <SendIcon
              sx={{
                transform: lang === "ar" ? "rotate(180deg)" : "",
              }}
            />
          </button>
        </div>
      </footer>
    </ChatDialogStyle>
  );
};
export default Layout;

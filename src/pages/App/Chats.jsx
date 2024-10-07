import { BsSend } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TbFlagHeart } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  Timestamp,
} from "firebase/firestore";

export const Chats = () => {
  const { error, setError, baseUrl } = useContext(AppContext);
  const [userLoading, setUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [chatRoom, setChatRoom] = useState();

  const [search, setSearch] = useState("");

  const getAllUsers = () => {
    setUserLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/auth/allUser`, { headers })
      .then((response) => {
        setUsers(response?.data?.data);
        setChatRoom(response?.data?.data[0].id);
        setUserLoading(false);
      })
      .catch((error) => {
        setUserLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, [reload]);

  // Get & Send Chats:
  const [messages, setMessages] = useState([]);
  const [messageLoading, setMessageLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [groupedMessages, setGroupedMessages] = useState([]);
  const messageEndRef = useRef();

  const groupMessagesByDate = (messages) => {
    return messages?.reduce((groups, message) => {
      const date = new Date(message?.timestamp?.seconds * 1000).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date]?.push(message);
      return groups;
    }, {});
  };

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [sending, setSending] = useState(false);

  async function sendMessage(chatRoomId, messageText, e) {
    e.preventDefault();
    try {
      setSending(true);
      const senderId = Cookies.get("id"); // Get the sender's ID
      const recipientId = chatRoom; // Assuming chatRoom is the ID of the user being interacted with
      const docRef = collection(db, "chatroom", chatRoomId, "messages");

      // Add a new message to the collection
      await addDoc(docRef, {
        senderId,
        message: messageText,
        timestamp: Timestamp.now(),
      });

      // Check if the recipient is already in the user list
      const recipientExists = users.some((user) => user?.id === recipientId);

      if (recipientExists) {
        // If the recipient exists, move them to the top
        setUsers((prevUsers) => {
          const filteredUsers = prevUsers.filter(
            (user) => user?.id !== recipientId
          );
          const updatedUsers = [
            prevUsers.find((user) => user?.id === recipientId),
            ...filteredUsers,
          ];
          return updatedUsers;
        });
      } else {
        // If the recipient does not exist, add them
        const newUser = {
          id: recipientId,
        };
        setUsers((prevUsers) => [newUser, ...prevUsers]); // Add new user to the top of the list
      }

      scrollToBottom();
      setInput("");
      setSending(false);
    } catch (e) {
      setSending(false);
      console.error("Error adding message: ", e);
    }
  }

  const [input, setInput] = useState("");

  useEffect(() => {
    if (chatRoom !== null) {
      try {
        setMessageLoading(true);

        const docRef = collection(db, "chatroom", chatRoom, "messages");

        const orderedQuery = query(docRef, orderBy("timestamp"));

        const unsubscribe = onSnapshot(orderedQuery, (querySnapshot) => {
          const documentsArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("messages", documentsArray);

          setMessages(documentsArray);
          scrollToBottom();

          setMessageLoading(false);
        });

        return () => {
          unsubscribe();
        };
      } catch (err) {
        console.log(err);
      }
    }
  }, [chatRoom]);

  useEffect(() => {
    if (messages?.length > 0) {
      console.log(Object.keys(groupMessagesByDate(messages)));
      setGroupedMessages(groupMessagesByDate(messages));
    }
  }, [messages]);

  const filteredData = users.filter((user) =>
    user?.name?.toLowerCase().includes(search?.toLowerCase())
  );

  return (
    <div className="w-full flex h-[92vh] -m-4 flex-row justify-between bg-white">
      <div className="w-full h-full px-5 flex flex-col justify-between">
        <div className="flex flex-col mt-5 h-full overflow-y-auto">
          {Object.keys(groupedMessages)?.map((date, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-center my-2">
                <div className="text-center text-xs text-gray-800 bg-gray-200 p-2 rounded-full mx-2 w-auto">
                  {new Date(date)?.toDateString() === new Date()?.toDateString()
                    ? "Today"
                    : new Date(date)?.toDateString() ===
                      new Date(Date.now() - 86400000)?.toDateString()
                    ? "Yesterday"
                    : date}
                </div>
              </div>
              {groupedMessages[date]?.map((message, index) => {
                return message?.senderId == Cookies.get("id") ? (
                  <div className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4 bg-purple-500 rounded-bl-3xl rounded-tl-3xl rounded-br-3xl text-white">
                      {message?.message}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-start mb-4">
                    <div className="ml-2 py-3 px-4 bg-gray-300 rounded-bl-3xl rounded-tr-3xl rounded-br-3xl text-gray-800">
                      {message?.message}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div ref={messageEndRef} />
        </div>
        <form
          onSubmit={(e) => {
            sendMessage(chatRoom, input, e);
          }}
          className="py-5 w-full relative flex justify-center items-center gap-2"
        >
          <input
            className="w-[100%] shadow-md py-3 px-4 border outline-none focus:border-purple-500 rounded-full"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
          />
          <button
            onClick={(e) => {
              sendMessage(chatRoom, input, e);
            }}
            className="w-10 h-10 absolute right-2 shadow-md rounded-full bg-purple-500 hover:opacity-95 text-xl text-white flex items-center justify-center font-medium"
          >
            {sending ? (
              <svg
                width="20"
                height="20"
                fill="#fff"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="4" cy="12" r="0">
                  <animate
                    begin="0;spinner_z0Or.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="0;3"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_OLMs.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="4;12"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_UHR2.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="12;20"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_lo66"
                    begin="spinner_Aguh.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="3;0"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_z0Or"
                    begin="spinner_lo66.end"
                    attributeName="cx"
                    dur="0.001s"
                    values="20;4"
                    fill="freeze"
                  ></animate>
                </circle>
                <circle cx="4" cy="12" r="3">
                  <animate
                    begin="0;spinner_z0Or.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="4;12"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_OLMs.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="12;20"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_JsnR"
                    begin="spinner_UHR2.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="3;0"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_Aguh"
                    begin="spinner_JsnR.end"
                    attributeName="cx"
                    dur="0.001s"
                    values="20;4"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_Aguh.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="0;3"
                    fill="freeze"
                  ></animate>
                </circle>
                <circle cx="12" cy="12" r="3">
                  <animate
                    begin="0;spinner_z0Or.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="12;20"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_hSjk"
                    begin="spinner_OLMs.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="3;0"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_UHR2"
                    begin="spinner_hSjk.end"
                    attributeName="cx"
                    dur="0.001s"
                    values="20;4"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_UHR2.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="0;3"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_Aguh.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="4;12"
                    fill="freeze"
                  ></animate>
                </circle>
                <circle cx="20" cy="12" r="3">
                  <animate
                    id="spinner_4v5M"
                    begin="0;spinner_z0Or.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="3;0"
                    fill="freeze"
                  ></animate>
                  <animate
                    id="spinner_OLMs"
                    begin="spinner_4v5M.end"
                    attributeName="cx"
                    dur="0.001s"
                    values="20;4"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_OLMs.end"
                    attributeName="r"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="0;3"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_UHR2.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="4;12"
                    fill="freeze"
                  ></animate>
                  <animate
                    begin="spinner_Aguh.end"
                    attributeName="cx"
                    calcMode="spline"
                    dur="0.5s"
                    keySplines=".36,.6,.31,1"
                    values="12;20"
                    fill="freeze"
                  ></animate>
                </circle>
              </svg>
            ) : (
              <BsSend />
            )}
          </button>
        </form>
      </div>
      <div className="hidden lg:flex flex-col h-full overflow-y-auto lg:w-2/5 border-l ">
        <div className="py-5 px-3 w-full flex justify-center items-center gap-2">
          <input
            className="w-[90%] shadow-md h-10 px-4 border outline-none focus:border-purple-500 rounded-full"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
          />
          <button className="w-9 h-9 shadow-md rounded-full bg-purple-500 hover:opacity-95 text-lg text-white flex items-center justify-center font-medium">
            <FiSearch />
          </button>
        </div>
        <div className="w-full h-auto grid grid-cols-1 gap-0">
          {filteredData?.map((user, index) => {
            return (
              <div
                key={index}
                onClick={() => setChatRoom(user?.id)}
                className={`w-full h-20 hover:bg-purple-500/[0.2] ${
                  user?.id == chatRoom ? "bg-purple-500/[0.2]" : "bg-white"
                } cursor-pointer border-b px-3 hidden lg:flex justify-start items-center gap-2`}
              >
                <span className="w-auto h-auto relative">
                  <img
                    src={
                      user?.profilePicture
                        ? user?.profilePicture
                        : `https://eu.ui-avatars.com/api/?name=${user?.name}&size=250`
                    }
                    className="w-10 h-10 rounded-full shadow-sm"
                  />
                  {/* <span className="w-3 h-3 rounded-full bg-green-500 shadow-md absolute bottom-0 right-0" /> */}
                </span>
                <div className="w-auto flex flex-col justify-start items-start">
                  <h3 className="text-sm font-semibold">{user?.name}</h3>
                  <h3 className="text-xs text-gray-700 font-semibold">
                    {user?.email}
                  </h3>
                </div>
                {/* <button className="w-16 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs ml-auto font-medium">
            Delete
          </button> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

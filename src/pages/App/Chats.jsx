import { BsSend } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TbFlagHeart } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import { db } from "../../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  Timestamp,
  doc,
  increment,
  updateDoc,
  where,
  getDocs,
  limit,
} from "firebase/firestore";
import Loader from "../../components/global/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../../components/global/Error";

export const Chats = () => {
  const { error, setError, baseUrl } = useContext(AppContext);
  const [userLoading, setUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  const [chatRoom, setChatRoom] = useState(null);
  const navigate = useNavigate();

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
        // setChatRoom(response?.data?.data[0].id);
        setUserLoading(false);
      })
      .catch((error) => {
        setUserLoading(false);
        if (error?.response?.status == 401) {
          Cookies.remove("token");
          navigate("/login");
        }
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
      const senderId = Cookies.get("id");
      const recipientId = chatRoom;

      // Send message to Firestore
      const docRef = collection(db, "chatroom", chatRoomId, "messages");

      const messageData = {
        senderId,
        message: messageText,
        readBy: {
          [senderId]: true,
          [recipientId]: false,
        },
        timestamp: Timestamp.now(),
      };
      try {
        await axios.post(
          `${baseUrl}/api/2/notifications/chatNotification`,
          {
            message: messageText,
            target: "user",
            userId: recipientId,
          },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
      } catch (error) {
        if (error.response.status == 401) {
          navigate("/login");
          return (
            <Error message={"Session expired. Please log in again21321."} />
          );
          // Redirect to login
        } else {
          console.error("Notification error:", error);
        }
      }
      await addDoc(docRef, messageData);

      // 🔴 Increment unread count for recipient in totalCount
      const chatroomDocRef = doc(db, "chatroom", chatRoomId);
      await updateDoc(chatroomDocRef, {
        [`totalCount.${recipientId}`]: increment(1),
      });

      // Update user order in UI
      const recipientExists = users.some((user) => user?.id === recipientId);
      if (recipientExists) {
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
        const newUser = { id: recipientId };
        setUsers((prevUsers) => [newUser, ...prevUsers]);
      }

      // 🔔 Send notification and handle 401

      scrollToBottom();
      setInput("");
      setSending(false);
    } catch (e) {
      setSending(false);
      console.error("Error sending message:", e);
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
      setGroupedMessages(groupMessagesByDate(messages));
    }
  }, [messages]);
  const limitedUsers = users;
  const [count, setCount] = useState([]);

  const fetchUnreadCounts = async () => {
    const currentAdminId = Cookies.get("id");
    const counts = [];

    const limitedUsers = users;

    const queryPromises = limitedUsers.map(async (user) => {
      const messagesRef = collection(db, "chatroom", user.id, "messages");

      const unreadQuery = query(
        messagesRef,
        where(`readBy.${currentAdminId}`, "==", false)
      );

      const latestMsgQuery = query(
        messagesRef,
        orderBy("timestamp", "desc"),
        limit(1)
      );

      try {
        const [unreadSnap, latestSnap] = await Promise.all([
          getDocs(unreadQuery),
          getDocs(latestMsgQuery),
        ]);

        const latestMsg = latestSnap.docs[0]?.data();
        const latestTimestamp = latestMsg?.timestamp?.toMillis() || 0;

        return {
          userId: user.id,
          count: unreadSnap.size,
          lastMessageTimestamp: latestTimestamp,
        };
      } catch (error) {
        console.error("Error fetching for user", user.id, error);
        return {
          userId: user.id,
          count: 0,
          lastMessageTimestamp: 0,
        };
      }
    });

    const results = await Promise.all(queryPromises);

    // Sort by latest timestamp (desc)
    results.sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

    setCount(results);
  };

  useEffect(() => {
    fetchUnreadCounts();
  }, [users]);

  const [filteredData, setFilteredData] = useState([]);
  // console.log(count,"querySnapshot");
  useEffect(() => {
    if (count.length > 0) {
      const countMap = new Map(count.map((c) => [c.userId, c]));

      const filteredUserData = limitedUsers
        .map((user) => {
          const c = countMap.get(user.id);
          return {
            ...user,
            unreadCount: c?.count || "",
            lastMessageTimestamp: c?.lastMessageTimestamp || 0,
          };
        })
        .filter((user) =>
          (user?.name || "").toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => b.lastMessageTimestamp - a.lastMessageTimestamp); // 💥 sorting

      setFilteredData(filteredUserData);
    }
  }, [count]);

  console.log(filteredData, count, "filteredData");

  return (
    <div className="w-full flex h-[92vh] -m-4 flex-row justify-between bg-white">
      <div className="w-full h-full px-5 flex flex-col justify-between">
        {messageLoading && (
          <div className="w-full col-span-4 h-[80vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {chatRoom && !messageLoading && messages?.length > 0 ? (
          <>
            <div className="flex flex-col mt-5 h-full overflow-y-auto">
              {Object.keys(groupedMessages)?.map((date, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-center my-2">
                    <div className="text-center text-xs text-gray-800 bg-gray-200 p-2 rounded-full mx-2 w-auto">
                      {new Date(date)?.toDateString() ===
                      new Date()?.toDateString()
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
          </>
        ) : (
          !messageLoading && (
            <div className="w-full col-span-3 h-[80vh] flex items-center justify-center">
              <img src="/no-data.jpg" alt="" className="h-96" />
            </div>
          )
        )}
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
          {filteredData?.length > 0 ? (
            filteredData?.map((user, index) => {
              console.log(user, "countRecord");
              return (
                <div
                  key={index}
                  onClick={async () => {
                    setChatRoom(user?.id);

                    const currentAdminId = Cookies.get("id");
                    const messagesRef = collection(
                      db,
                      "chatroom",
                      user?.id,
                      "messages"
                    );
                    const q = query(
                      messagesRef,
                      where(`readBy.${currentAdminId}`, "==", false)
                    );

                    const snapshot = await getDocs(q);

                    const updatePromises = snapshot.docs.map((docSnap) => {
                      const messageRef = doc(
                        db,
                        "chatroom",
                        user?.id,
                        "messages",
                        docSnap.id
                      );
                      return updateDoc(messageRef, {
                        [`readBy.${currentAdminId}`]: true,
                      });
                    });

                    // Reset totalCount for this user
                    const chatroomRef = doc(db, "chatroom", user?.id);
                    const resetCount = updateDoc(chatroomRef, {
                      [`totalCount.${currentAdminId}`]: 0,
                    });

                    await Promise.all([...updatePromises, resetCount]);

                    fetchUnreadCounts();
                  }}
                  className={`w-full h-20 ${
                    user?.unreadCount > 0 ? "bg-gray-100" : ""
                  } hover:bg-purple-500/[0.2]                                   
                  cursor-pointer border-b px-3 hidden lg:flex justify-between items-center gap-2`}
                >
                  <div className="w-auto h-auto flex justify-start items-center gap-2">
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
                  </div>
                  <div
                    className={`flex items-center justify-center rounded-full text-[18px] font-semibold ${
                      user?.unreadCount
                        ? "w-8 h-8 bg-purple-500 text-white"
                        : ""
                    } `}
                  >
                    {user?.unreadCount}
                  </div>
                  {/* <button className="w-16 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs ml-auto font-medium">
            Delete
          </button> */}
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <h3 className="text-md font-bold text-gray-500">
                No such user onboarded!
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

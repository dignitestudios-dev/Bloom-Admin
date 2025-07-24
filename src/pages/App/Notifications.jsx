import React from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { IoMdNotifications } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import NotificationCreateModal from "../../components/Notifications/NotificationCreateModal";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../components/global/Loader";
import { useNavigate } from "react-router-dom";
import { notification } from "../../data/create/notification";

const Notifications = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { error, setError, baseUrl } = useContext(AppContext);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");

  const getAdminNotifications = () => {
    setNotificationLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/2/notifications/admin`, { headers })
      .then((response) => {
        setNotifications(response?.data?.data?.reverse());
        setNotificationLoading(false);
      })
      .catch((error) => {
        setNotificationLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  const getUserNotifications = () => {
    setNotificationLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/2/notifications/admin/get`, { headers })
      .then((response) => {
        setNotifications(response?.data?.data?.reverse());
        setNotificationLoading(false);
      })
      .catch((error) => {
        setNotificationLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getUserNotifications();
  }, [reload]);

  const filteredData = notifications.filter((notification) =>
    notification?.title?.toLowerCase().includes(search?.toLowerCase())
  );

  const { setActiveLink } = useContext(AppContext);
  const navigate = useNavigate();

  function timeAgo(isoString) {
    const now = new Date();
    const createdAt = new Date(isoString);
    const seconds = Math.floor((now - createdAt) / 1000);

    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(seconds / 3600);
    const days = Math.floor(seconds / 86400);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
  }

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <NotificationCreateModal
        isOpen={isCreateOpen}
        setIsOpen={setIsCreateOpen}
        setReload={setReload}
      />
      <button
        onClick={() => setIsCreateOpen((prev) => !prev)}
        className={`active:scale-95 fixed bottom-4 right-6 flex justify-center items-center w-12 h-12 rounded-full bg shadow-md border border-purple-500 text-white  font-medium text-xl  outline-none   hover:opacity-90 transition-all duration-500 ${
          isCreateOpen ? "rotate-45" : "rotate-0"
        }`}
      >
        <span className="leading-3">
          <FiPlus />
        </span>
      </button>

      <div className="w-full h-auto flex justify-between items-center gap-2">
        <div className="w-[50%] shadow-sm lg:flex  px-[2px] py-[2px] border border-gray-200 bg-white h-12 rounded-full">
          {/* <button
            onClick={() => setActiveTab("admin")}
            className={`min-w-[90px] w-full px-4 py-2 capitalize text-sm font-normal leading-[17.58px] ${
              activeTab === "admin"
                ? "bg-purple-500  text-white"
                : "bg-white  text-black"
            } rounded-l-full `}
          >
            Admin
          </button> */}
          <button
            className={`min-w-[90px] w-full px-4 py-2 capitalize bg-purple-500 text-white text-sm font-normal leading-[17.58px] rounded-full `}
          >
            User
          </button>
        </div>
        <div className="w-[50%] h-12 flex justify-start items-center gap-2  relative">
          <input
            type="text"
            id="name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. New Feature in built"
            className=" block w-full rounded-full border border-gray-200 px-3 h-12 shadow-sm outline-none focus:border-gradient focus:ring focus:ring-purple-200 focus:ring-opacity-50"
          />

          <button className="active:scale-95 absolute right-1 top-1 rounded-full bg-purple-500 px-8 h-10 font-medium text-white outline-none   hover:opacity-90">
            Search
          </button>
        </div>
      </div>

      <div className="w-full h-auto grid grid-cols-3 gap-2 justify-start items-start">
        {notificationLoading && (
          <div className="w-full col-span-3 h-[80vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!notificationLoading && filteredData?.length > 0
          ? filteredData?.reverse()?.map((notification, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    console.log(notification);
                    if (notification?.post) {
                      setActiveLink("Categories");
                      navigate("/categories", {
                        state: {
                          open: true,
                          id: notification?.post,
                          category: notification?.category,
                        },
                      });
                    }
                  }}
                  class=" px-6 cursor-pointer py-4 bg-purple-500/10 border rounded-2xl h-28  w-full"
                >
                  <div class=" inline-flex items-center justify-between w-full">
                    <div class="inline-flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <IoMdNotifications className="text-purple-600 text-2xl" />
                      </div>
                      <h3 class="font-bold text-base text-gray-800">
                        {notification?.title}
                      </h3>
                    </div>
                    <p class="text-xs text-gray-500">
                      {timeAgo(
                        notification?.createdAt
                          ? notification?.createdAt
                          : notification?.date
                      )}
                    </p>
                  </div>
                  <p class="mt-1 text-sm">
                    {notification?.message?.length > 80
                      ? notification?.message?.slice(0, 80) + "..."
                      : notification?.message}
                  </p>
                </div>
              );
            })
          : !notificationLoading && (
              <div className="w-full col-span-3 h-[90vh] flex items-center justify-center">
                <img src="/no-data.jpg" alt="" className="h-96" />
              </div>
            )}
      </div>
    </div>
  );
};

export default Notifications;

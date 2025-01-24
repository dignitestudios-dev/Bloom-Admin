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
import DeleteComment from "../../components/categories/DeleteComment";
import DeleteReport from "../../components/categories/DeleteReport";

const Reports = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { error, setError, baseUrl, setSuccess } = useContext(AppContext);
  const [reportLoading, setReportLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [reload, setReload] = useState(false);
  const [activeTab, setActiveTab] = useState("admin");

  const [search, setSearch] = useState("");

  const getReports = () => {
    setReportLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/reports`, { headers })
      .then((response) => {
        setReports(response?.data?.data);
        setReportLoading(false);
      })
      .catch((error) => {
        setReportLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getReports();
  }, [reload]);

  const filteredData = reports.filter((notification) =>
    notification?.reporter?.name?.toLowerCase().includes(search?.toLowerCase())
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

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onConfirm = () => {
    setDeleteLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/reports/${deleteId}`, { headers })
      .then((response) => {
        setSuccess("Comment deleted successfully.");
        setReload((prev) => !prev);
        setDeleteOpen(false);
        setDeleteLoading(false);
      })
      .catch((error) => {
        setDeleteLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full h-auto flex justify-between items-center gap-2">
        <div className="w-full h-12 flex justify-start items-center gap-2  relative">
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
        {reportLoading && (
          <div className="w-full col-span-3 h-[80vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!reportLoading && filteredData?.length > 0
          ? filteredData?.reverse()?.map((notification, index) => {
              return (
                <div
                  key={index}
                  class=" px-6 relative py-4 bg-purple-500/10 border rounded-2xl h-36  w-full"
                >
                  <div class=" inline-flex items-center justify-between w-full">
                    <div class="inline-flex gap-2 items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                        <img
                          src={
                            notification?.reporter?.profilePicture ||
                            `https://eu.ui-avatars.com/api/?name=${notification?.reporter?.name}&size=250`
                          }
                          className="w-full h-full rounded-full"
                          alt=""
                        />
                      </div>
                      <h3 class="font-bold text-base text-gray-800">
                        {notification?.reporter?.name}
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
                    {notification?.comment?.text?.length > 80
                      ? notification?.comment?.text?.slice(0, 80) + "..."
                      : notification?.comment?.text}
                  </p>

                  <div
                    id="dropdown-button"
                    data-target="dropdown-1"
                    class="w-full justify-end absolute bottom-3 right-3 dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  "
                    type="button"
                  >
                    <button
                      id="dropdown-button"
                      data-target="dropdown-2"
                      onClick={() => {
                        setDeleteOpen(true);
                        setDeleteId(notification?._id);
                      }}
                      class="w-12 h-7 justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-xs font-medium bg text-white text-center rounded-full   "
                      type="button"
                    >
                      Delete
                    </button>

                    {deleteOpen && (
                      <DeleteReport
                        showModal={deleteOpen}
                        setShowModal={setDeleteOpen}
                        onConfirm={onConfirm}
                        loading={deleteLoading}
                      />
                    )}
                  </div>
                </div>
              );
            })
          : !reportLoading && (
              <div className="w-full col-span-3 h-[90vh] flex items-center justify-center">
                <img src="/no-data.jpg" alt="" className="h-96" />
              </div>
            )}
      </div>
    </div>
  );
};

export default Reports;

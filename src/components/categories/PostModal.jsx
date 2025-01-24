import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import Cookies from "js-cookie";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import DeleteComment from "./DeleteComment";

const PostModal = ({ isOpen, onRequestClose, postId }) => {
  const { baseUrl, setError, setSuccess } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getAllComments = () => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/comments/${postId}`, { headers })
      .then((response) => {
        setComments(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // setError(error?.response?.data?.message);
      });
  };
  useEffect(() => {
    isOpen && postId !== null && getAllComments();
  }, []);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const onConfirm = () => {
    setDeleteLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/v2/comments/admin/${deleteId}`, { headers })
      .then((response) => {
        setSuccess("Comment deleted successfully.");
        onRequestClose();
        setDeleteOpen(false);
        setDeleteLoading(false);
      })
      .catch((error) => {
        setDeleteLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    deleteId && onConfirm();
  }, [deleteId]);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="flex items-center justify-center outline-none z-[1000]"
      overlayClassName="fixed inset-0 bg-[#C6C6C6] outline-none bg-opacity-50   w-fullbackdrop-blur-sm z-[1000]  flex justify-center items-center"
    >
      <div className="bg-white p-6 rounded-[24px] shadow-lg max-h-[95vh] w-[50vw]  items-center flex flex-col gap-2 justify-center ">
        {loading ? (
          <div className="w-full h-40 flex items-center justify-center">
            <span className="text-3xl font-medium">Loading...</span>
          </div>
        ) : comments?.length > 0 ? (
          <section class="w-full h-full overflow-y-auto relative">
            <div class="w-full  px-1 ">
              <div class="w-full flex-col justify-start items-start lg:gap-10 gap-6 inline-flex">
                <div class="w-full flex-col justify-start items-start lg:gap-9 gap-6 flex">
                  <div class="w-full flex-col justify-start items-start gap-8 flex">
                    <div class="w-full flex-col justify-start items-end gap-5 flex">
                      {comments?.map((comment, key) => {
                        return (
                          <>
                            <div
                              key={key}
                              class="w-full p-4 bg-purple-500/20 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex"
                            >
                              <div class="w-full flex-col justify-center items-start gap-3.5 flex">
                                <div class="w-full justify-between items-center inline-flex">
                                  <div class="justify-start items-center gap-2.5 flex">
                                    <div class="w-10 h-10 bg-gray-300 rounded-full justify-start items-start gap-2.5 flex">
                                      <img
                                        class="rounded-full w-full h-full object-cover"
                                        src={
                                          comment?.userId?.profilePicture ||
                                          `https://eu.ui-avatars.com/api/?name=${comment?.userId?.name}&size=250`
                                        }
                                        alt="Jenny wilson image"
                                      />
                                    </div>
                                    <div class="flex-col justify-start items-start gap-1 inline-flex">
                                      <h5 class="text-gray-900 text-sm font-semibold leading-snug">
                                        {comment?.userId?.name}
                                      </h5>
                                      <h6 class="text-gray-500 text-xs font-normal leading-5">
                                        {timeAgo(comment?.createdAt)}
                                      </h6>
                                    </div>
                                  </div>
                                  <div class="w-6 h-6 relative">
                                    <div class="w-full h-fit flex">
                                      <div class="relative w-full">
                                        <div class=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                                        <div
                                          id="dropdown-button"
                                          data-target="dropdown-1"
                                          class="w-full justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-base font-medium text-center text-gray-900 bg-transparent  absolute right-0 top-0"
                                          type="button"
                                        >
                                          <button
                                            id="dropdown-button"
                                            data-target="dropdown-2"
                                            onClick={() => {
                                              setDeleteOpen(true);
                                            }}
                                            class="w-12 h-7 justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-xs font-medium bg text-white text-center rounded-full   absolute right-0 top-0"
                                            type="button"
                                          >
                                            Delete
                                          </button>

                                          <DeleteComment
                                            showModal={deleteOpen}
                                            setShowModal={setDeleteOpen}
                                            commentId={comment?._id}
                                            setDeleteId={setDeleteId}
                                            loading={deleteLoading}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p class="text-gray-800 text-xs font-normal leading-snug">
                                  {comment?.text}
                                </p>
                              </div>
                            </div>
                            {comment?.replies?.map((reply, key) => {
                              return (
                                <div
                                  key={key}
                                  class="w-full lg:pl-20 md:pl-14 sm:pl-10 pl-7 flex-col justify-start items-end gap-2.5 flex"
                                >
                                  <div class="w-full p-4 bg-purple-500/10 rounded-2xl border border-gray-200 flex-col justify-start items-start gap-8 flex">
                                    <div class="w-full flex-col justify-center items-start gap-3.5 flex">
                                      <div class="w-full justify-between items-center inline-flex">
                                        <div class="justify-start items-center gap-2.5 flex">
                                          <div class="w-10 h-10 bg-stone-300 rounded-full justify-start items-start gap-2.5 flex">
                                            <img
                                              class="rounded-full w-full h-full object-cover"
                                              src={
                                                reply?.userId?.profilePicture ||
                                                `https://eu.ui-avatars.com/api/?name=${reply?.userId?.name}&size=250`
                                              }
                                              alt="Kevin Patel image"
                                            />
                                          </div>
                                          <div class="flex-col justify-start items-start gap-1 inline-flex">
                                            <h5 class="text-gray-900 text-sm font-semibold leading-snug">
                                              {reply?.userId?.name}
                                            </h5>
                                            <h6 class="text-gray-500 text-xs font-normal leading-5">
                                              {timeAgo(reply?.createdAt)}
                                            </h6>
                                          </div>
                                        </div>
                                        <div class="w-6 h-6 relative">
                                          <div class="w-full h-fit flex">
                                            <div class="relative w-full">
                                              <div class=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
                                              <button
                                                id="dropdown-button"
                                                onClick={() => {
                                                  setDeleteOpen(true);
                                                }}
                                                data-target="dropdown-2"
                                                class="w-12 h-7 justify-center dropdown-toggle flex-shrink-0 z-10 flex items-center text-xs font-medium bg text-white text-center rounded-full   absolute right-0 top-0"
                                                type="button"
                                              >
                                                Delete
                                              </button>
                                              <DeleteComment
                                                showModal={deleteOpen}
                                                setShowModal={setDeleteOpen}
                                                commentId={comment?._id}
                                                setDeleteId={setDeleteId}
                                                loading={deleteLoading}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <p class="text-gray-800 text-xs font-normal leading-snug">
                                        {comment?.text}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
            <img src="/no-data.jpg" alt="" className="h-56" />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PostModal;

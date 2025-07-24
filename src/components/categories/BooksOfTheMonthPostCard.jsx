import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import axios from "axios";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import DeletionModal from "./DeletionModal";
import { useNavigate } from "react-router-dom";

const BooksOfTheMonthPostCard = ({
  post,
  setUpdate,
  setPostId,
  setCommentOpen,
  getAllposts,
}) => {
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }

  const navigate = useNavigate();

  const { error, setError, baseUrl, success, setSuccess } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const deletePost = (postId, categoryId) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/book/${categoryId}/${postId}`, { headers })
      .then((response) => {
        setUpdate((prev) => !prev);
        getAllposts();
        setLoading(false);
        setSuccess("Post deleted successfully.");
      })
      .catch((error) => {
        setLoading(false);
        if (error?.response?.status == 401) {
          Cookies.remove("token");
          navigate("/login");
        }
        setError(error?.response?.data?.message);
      });
  };
  const [showModal, setShowModal] = useState(false);

  return (
    <div class="w-full  relative">
      <DeletionModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        action={() => deletePost(post?._id, post?.categoryId)}
      />
      <button
        onClick={() => setShowModal(true)}
        className="w-8 h-8 rounded-full bg-purple-600 z-50 text-white text-md flex items-center justify-center absolute top-2 right-2"
      >
        {loading ? <GoKebabHorizontal /> : <MdDeleteOutline />}
      </button>
      <div class="c-card block bg-white border rounded-lg overflow-hidden">
        <div class="relative pb-48 overflow-hidden">
          <img
            class="absolute inset-0 h-full w-full object-cover"
            src={post?.image}
            alt=""
          />
        </div>
        <div class="p-4">
          {/* <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                Highlight
              </span> */}
          <h2 class="mt-2 mb-2  font-bold">{post?.title}</h2>
          <p class="text-sm">{post?.description}</p>
          <div class="mt-3 flex items-center">
            <span class="text-sm font-semibold">$</span>&nbsp;
            <span class="font-bold text-xl">{post?.price}</span>&nbsp;
          </div>
        </div>
        <div class="p-4 border-t border-b text-xs text-gray-700">
          <span class="flex items-center mb-1">
            <i class="far fa-clock fa-fw mr-2 text-gray-900"></i>{" "}
            {formatDate(post?.createdAt)}
          </span>
          <span class="flex items-center">
            <i class="far fa-address-card font-bold fa-fw text-gray-900 mr-2"></i>{" "}
            {post?.author}
          </span>
        </div>
        <div class="w-full px-5 my-2 flex justify-start items-center gap-3 ">
          <span class="flex  rounded-lg  py-1 flex-row justify-start items-center w-auto space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1c1c"
              stroke-width="2"
              stroke-linecap="square"
              stroke-linejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <span class="font-semibold text-sm text-[#1c1c1c]">
              {post?.likeCount}
            </span>
          </span>
          <span
            onClick={() => {
              setCommentOpen(true);
              setPostId(post?._id);
            }}
            class="flex cursor-pointer rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1c1c1c"
              stroke-width="2"
              stroke-linecap="square"
              stroke-linejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="font-semibold text-sm text-[#1c1c1c]">
              {post?.commentsCount}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BooksOfTheMonthPostCard;

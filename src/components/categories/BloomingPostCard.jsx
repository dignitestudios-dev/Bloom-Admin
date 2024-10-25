import React, { useContext, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { MdDeleteOutline } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import DeletionModal from "./DeletionModal";

const BloomingPostCard = ({ post, setUpdate }) => {
  const { error, setError, baseUrl, success, setSuccess } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const deletePost = (postId, categoryId) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/blooming/${categoryId}/${postId}`, { headers })
      .then((response) => {
        setUpdate((prev) => !prev);
        setLoading(false);
        setSuccess("Post deleted successfully.");
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full h-80  rounded-2xl relative">
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
      <img
        src={post?.image}
        alt="super-boost-post-card"
        className="w-full h-full rounded-2xl absolute top-0 left-0"
      />

      <div className="w-full px-3 absolute bottom-3 left-0 h-auto flex flex-col gap-[1px]  ">
        <h2 className="text-white text-md font-semibold">{post?.title}</h2>

        <div class="w-full flex justify-start items-center gap-3 ">
          <button class="flex  rounded-lg  py-1 flex-row justify-start items-center w-auto space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="square"
              stroke-linejoin="round"
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
            </svg>
            <span class="font-semibold text-sm text-white">
              {post?.likeCount}
            </span>
          </button>
          <button class="flex  rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="square"
              stroke-linejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span class="font-semibold text-sm text-white">
              {" "}
              {post?.commentsCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BloomingPostCard;

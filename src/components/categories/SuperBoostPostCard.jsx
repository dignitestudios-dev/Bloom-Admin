import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import DeletionModal from "./DeletionModal";

const SuperBoostPostCard = ({
  post,
  categoryId,
  setUpdate,
  setPostId,
  setCommentOpen,
}) => {
  const { error, setError, baseUrl, success, setSuccess } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const deletePost = (postId) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/superBoost/${categoryId}/${postId}`, {
        headers,
      })
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
    <div className="w-full bg-purple-500/20 h-80 rounded-2xl group  relative">
      <DeletionModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        action={() => deletePost(post?.id, post?.categoryId)}
      />
      <button
        onClick={() => setShowModal(true)}
        className="w-8 h-8 rounded-full bg-purple-600 z-50 text-white text-md flex items-center justify-center absolute top-2 right-2"
      >
        {loading ? <GoKebabHorizontal /> : <MdDeleteOutline />}
      </button>
      {/* <span className="w-full h-full rounded-2xl group-hover:scale-0 transition-all duration-150 z-20 bg-black/20  absolute top-0 left-0"></span> */}
      <img
        src={post?.content}
        alt="super-boost-post-card"
        className="w-full h-full bg-purple-500/20 rounded-2xl  absolute top-0 left-0"
      />

      <h2 className="text-purple-500 z-30 text-xs font-medium absolute top-3 left-3">
        Jul 16, 2024
      </h2>

      <div className="w-full px-3 absolute bottom-3 left-0 h-auto flex flex-col gap-[1px]  ">
        <h2 className="text-purple-500 z-30 text-md font-bold">
          {post?.title}
        </h2>
        <p className="text-purple-500 z-30 text-xs font-normal leading-4 tracking-tighter">
          {post?.description?.length > 200
            ? post?.description?.slice(0, 200) + "..."
            : post?.description}
        </p>
        <div class="w-full   flex justify-between">
          <p class="ml-1 text-purple-500">{post?.likeCount}</p>
          <button
            onClick={() => {
              setCommentOpen(true);
              setPostId(post?.id);
            }}
            class="ml-1 hover:underline underline-offset-2 cursor-pointer text-purple-500 "
          >
            {post?.commentsCount} comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuperBoostPostCard;

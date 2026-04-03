import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLike, AiOutlineComment, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import DeletionModal from "./DeletionModal";

const SuperBoostPostCard = ({
  post,
  categoryId,
  setUpdate,
  setPostId,
  setCommentOpen,
  getAllposts,
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
        getAllposts();
        setSuccess("Post deleted successfully.");
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data?.message);
      });
  };
  const [showModal, setShowModal] = useState(false);
  const [showDescModal, setShowDescModal] = useState(false);

  return (
    <>
      <div className="w-full h-80 rounded-2xl group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-out transform hover:-translate-y-1">
        <DeletionModal
          showModal={showModal}
          setShowModal={setShowModal}
          loading={loading}
          action={() => deletePost(post?.id, post?.categoryId)}
        />
        
        {/* Image Background */}
        <img
          src={post?.content}
          alt="super-boost-post-card"
          className="w-full h-full object-cover object-center rounded-2xl absolute top-0 left-0 group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        
        {/* Dark Gradient Overlay - improved readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-purple-900/20 to-transparent rounded-2xl"></div>
        
        {/* Delete Button */}
        <button
          onClick={() => setShowModal(true)}
          className="w-10 h-10 rounded-full bg-red-500 hover:bg-red-600 z-50 text-white font-semibold flex items-center justify-center absolute top-3 right-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
          title="Delete post"
        >
          {loading ? (
            <GoKebabHorizontal className="animate-spin text-lg" />
          ) : (
            <MdDeleteOutline className="text-lg" />
          )}
        </button>
        
        {/* Date Badge */}
        <div className="absolute top-3 left-3 bg-purple-500/80 backdrop-blur-sm px-3 py-1 rounded-full">
          <p className="text-white text-xs font-semibold">
            {post?.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full px-4 absolute bottom-0 left-0 h-auto flex flex-col gap-3 pb-4 z-20">
          {/* Title */}
          <h2 className="text-white text-lg font-bold line-clamp-2 text-shadow leading-tight">
            {post?.title}
          </h2>
          
          {/* Description */}
          <p className="text-gray-100 text-sm font-normal leading-5 tracking-tight line-clamp-1">
            {post?.description}
          </p>
          
          {/* Engagement Stats */}
          <div className="w-full flex justify-between items-center pt-2 border-t border-white/20">
            <div className="flex items-center gap-4">
              {/* Likes */}
              <button className="flex items-center gap-1.5 text-white/90 hover:text-purple-300 transition-colors duration-200 group/stat">
                <AiOutlineLike className="text-lg group-hover/stat:scale-110 transition-transform duration-200" />
                <span className="text-xs font-semibold">{post?.likeCount || 0}</span>
              </button>
              
              {/* Comments */}
              <button
                onClick={() => {
                  setCommentOpen(true);
                  setPostId(post?.id);
                }}
                className="flex items-center gap-1.5 text-white/90 hover:text-purple-300 transition-colors duration-200 group/stat"
              >
                <AiOutlineComment className="text-lg group-hover/stat:scale-110 transition-transform duration-200" />
                <span className="text-xs font-semibold">{post?.commentsCount || 0}</span>
              </button>
            </div>
            
            {/* View Button */}
            <button
              onClick={() => setShowDescModal(true)}
              className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
              title="View full post"
            >
              <AiOutlineEye className="text-lg" />
            </button>
          </div>
        </div>
      </div>

      {/* Full Post Details Modal - Outside card to avoid overflow constraints */}
      {showDescModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl my-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 sticky top-0 bg-white rounded-t-3xl">
              <h3 className="text-gray-900 font-bold text-lg line-clamp-1 flex-1 pr-2">{post?.title}</h3>
              <button
                onClick={() => setShowDescModal(false)}
                className="text-gray-500 hover:text-gray-900 transition-colors duration-200 p-1 flex-shrink-0"
              >
                <AiOutlineClose className="text-xl" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 max-h-[60vh] overflow-y-auto">
              {/* Image */}
              {post?.content && (
                <div className="mb-5 rounded-xl overflow-hidden">
                  <img
                    src={post?.content}
                    alt={post?.title}
                    className="w-full h-auto object-cover max-h-80"
                  />
                </div>
              )}
              
              {/* Date */}
              <p className="text-purple-600 text-xs font-semibold mb-3">
                {post?.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { 
                  month: "long", 
                  day: "numeric", 
                  year: "numeric" 
                }) : ""}
              </p>

              {/* Full Description */}
              <p className="text-gray-700 text-sm leading-7 whitespace-pre-wrap">
                {post?.description}
              </p>

              {/* Stats Section */}
              <div className="mt-6 pt-5 border-t border-gray-200 flex gap-6">
                <div className="flex items-center gap-2">
                  <AiOutlineLike className="text-lg text-purple-600" />
                  <span className="text-gray-900 font-semibold text-sm">{post?.likeCount || 0} Likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <AiOutlineComment className="text-lg text-purple-600" />
                  <span className="text-gray-900 font-semibold text-sm">{post?.commentsCount || 0} Comments</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-end sticky bottom-0 bg-white rounded-b-3xl">
              <button
                onClick={() => {
                  setCommentOpen(true);
                  setPostId(post?.id);
                  setShowDescModal(false);
                }}
                className="p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-all duration-200 hover:scale-110 flex items-center justify-center"
                title="View comments"
              >
                <AiOutlineComment className="text-lg" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperBoostPostCard;

import React, { useContext, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import axios from "axios";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";

const EnrichmentPostCard = ({ post, setUpdate, categoryId }) => {
  console.log(post);
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }
  const { error, setError, baseUrl, success, setSuccess } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const deletePost = (postId) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/enrichment/${categoryId}/${postId}`, { headers })
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
  return (
    <button className="w-full h-24 rounded-2xl bg-gray-50 relative px-2 flex justify-start items-center gap-3">
      <button
        onClick={() => deletePost(post?._id, post?.categoryId)}
        className="w-8 h-8 rounded-full bg-purple-600 z-50 text-white text-md flex items-center justify-center absolute bottom-2 right-2"
      >
        {loading ? <GoKebabHorizontal /> : <MdDeleteOutline />}
      </button>
      <div className="w-20 h-20 relative">
        <img
          src={post?.videothumbnailUrl}
          alt=""
          className="w-full h-full rounded-xl"
        />
        <span className="w-6 h-6 rounded-full absolute top-[calc(50%-0.75rem)] left-[calc(50%-0.75rem)] flex items-center justify-center bg-[#1c1c1c] text-white text-xs">
          <FaPlay />
        </span>
      </div>

      <div className=" relative w-[calc(100%-6rem)] h-full pt-2 overflow-y-auto flex flex-col justify-start items-start gap-1">
        <h3 className="text-md font-semibold text-[#1c1c1c] ">
          {post?.title?.length > 30
            ? post?.title?.slice(0, 30) + "..."
            : post?.title}
        </h3>
        <p className="text-xs text-left font-normal leading-4 tracking-tighter text-[#1c1c1c]">
          {post?.description?.length > 70
            ? post?.description?.slice(0, 70) + "..."
            : post?.description}
        </p>

        <div className="w-auto flex justify-start items-center gap-3 text-xs absolute bottom-2 font-medium text-gray-600">
          <span>{formatDate(post?.createdAt)}</span>-
          <span>{post?.duration}</span>
        </div>
      </div>
    </button>
  );
};

export default EnrichmentPostCard;

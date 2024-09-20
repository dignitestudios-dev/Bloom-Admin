import React from "react";
import { FaPlay } from "react-icons/fa";

const EnrichmentPostCard = ({ post }) => {
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }
  return (
    <button className="w-full h-24 rounded-2xl bg-gray-50 px-2 flex justify-start items-center gap-3">
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

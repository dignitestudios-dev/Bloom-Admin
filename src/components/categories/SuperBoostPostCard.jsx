import React from "react";

const SuperBoostPostCard = ({ post }) => {
  return (
    <div className="w-full h-80 rounded-2xl relative">
      <img
        src={post?.content}
        alt="super-boost-post-card"
        className="w-full h-full rounded-2xl absolute top-0 left-0"
      />

      <h2 className="text-white text-xs font-medium absolute top-3 left-3">
        Jul 16, 2024
      </h2>

      <div className="w-full px-3 absolute bottom-3 left-0 h-auto flex flex-col gap-[1px]  ">
        <h2 className="text-white text-md font-semibold">{post?.title}</h2>
        <p className="text-white text-xs font-normal leading-4 tracking-tighter">
          {post?.description?.length > 200
            ? post?.description?.slice(0, 200) + "..."
            : post?.description}
        </p>
      </div>
    </div>
  );
};

export default SuperBoostPostCard;

import React from "react";

const BloomingPostCard = ({ post }) => {
  return (
    <div className="w-full h-80 rounded-2xl relative">
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

import React from "react";

const BrittanyPlaylistCard = ({ post, setPostId, setCommentOpen, getAllposts }) => {
  return (
    <div class="bg-white w-full h-[26rem] relative shadow rounded-2xl border p-3">
      <div class="group h-64 relative">
        <img
          class="w-full h-full block rounded-xl"
          src={post?.audioCover}
          alt=""
        />
        {/* <div class="absolute bg-black rounded-xl bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
          <button class="hover:scale-110 text-white opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              class="bi bi-play-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
            </svg>
          </button>
        </div> */}
      </div>
      <div class="py-3 px-2">
        <h3 class="text-[#0e0e0e] text-lg font-semibold">
          {post?.title?.length > 40
            ? post?.title?.slice(0, 40) + "..."
            : post?.title}
        </h3>
        <h3 class="text-purple-500 text-sm font-medium">{post?.singerName}</h3>

        <p class="text-gray-700 text-xs font-normal leading-tight tracking-tighter">
          {post?.description?.length > 70
            ? post?.description?.slice(0, 70) + "..."
            : post?.description}
        </p>
      </div>
      <div class="w-full flex absolute bottom-1 left-2 justify-start items-center gap-3 ">
        <span class="flex  rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span class="font-semibold text-sm text-gray-600">
            {post?.likeCount}
          </span>
        </span>
        <button
          onClick={() => {
            setCommentOpen(true);
            setPostId(post?._id);
          }}
          class="flex cursor-pointer  rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#838383"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="font-semibold text-sm text-gray-600">
            {post?.commentsCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default BrittanyPlaylistCard;

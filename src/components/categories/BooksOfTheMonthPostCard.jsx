import React from "react";

const BooksOfTheMonthPostCard = ({ post }) => {
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(",", "");
  }
  return (
    <div class="w-full  ">
      <a
        href=""
        class="c-card block bg-white border rounded-lg overflow-hidden"
      >
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
          <p class="text-sm">
            {post?.description?.length > 100
              ? post?.description?.slice(0, 100) + "..."
              : post?.description}
          </p>
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
          <button class="flex  rounded-lg  py-1 flex-row justify-start items-center w-auto space-x-1">
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
          </button>
          <button class="flex  rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-1">
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
          </button>
        </div>
      </a>
    </div>
  );
};

export default BooksOfTheMonthPostCard;

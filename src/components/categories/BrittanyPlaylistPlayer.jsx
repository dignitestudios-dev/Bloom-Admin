import React from "react";

const BrittanyPlaylistPlayer = () => {
  return (
    <div className="w-full  rounded-xl">
      <div class="bg-white   border  rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8  items-center">
        <div class="flex items-center space-x-4">
          <img
            src="https://img.freepik.com/free-psd/square-flyer-template-maximalist-business_23-2148524497.jpg?w=1800&t=st=1699458420~exp=1699459020~hmac=5b00d72d6983d04966cc08ccd0fc1f80ad0d7ba75ec20316660e11efd18133cd"
            alt=""
            width="88"
            height="88"
            class="flex-none rounded-lg bg-slate-100"
            loading="lazy"
          />
          <div class="min-w-0 flex-auto space-y-1 font-semibold">
            <p class="text-purple-500  text-sm leading-6">
              <abbr title="Track">Track:</abbr> 05
            </p>
            <h2 class="text-slate-500  text-sm leading-6 truncate">
              Music: New Album The Lorem
            </h2>
            <p class="text-slate-900  text-lg">Spotisimo</p>
          </div>
        </div>
        <div class="space-y-2">
          <div class="relative">
            <div class="bg-white  rounded-full overflow-hidden">
              <div
                class="bg-purple-500 w-1/2 h-2"
                role="progressbar"
                aria-label="music progress"
                aria-valuenow="1456"
                aria-valuemin="0"
                aria-valuemax="4550"
              ></div>
            </div>
            <div class="ring-purple-500  ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow">
              <div class="w-1.5 h-1.5 bg-purple-500  rounded-full ring-1 ring-inset ring-slate-900/5"></div>
            </div>
          </div>
          <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
            <div class="text-purple-500 ">1:75</div>
            <div class="text-slate-500 ">3:20</div>
          </div>
        </div>
      </div>
      <div class="bg-white border-x border-b text-slate-500  rounded-b-xl flex items-center">
        <div class="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Add to favorites">
            <svg width="24" height="24">
              <path
                d="M7 6.931C7 5.865 7.853 5 8.905 5h6.19C16.147 5 17 5.865 17 6.931V19l-5-4-5 4V6.931Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="hidden sm:block lg:hidden xl:block"
            aria-label="Previous"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="m10 12 8-6v12l-8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button type="button" aria-label="Rewind 10 seconds">
            <svg width="24" height="24" fill="none">
              <path
                d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5 5v3.111c0 .491.398.889.889.889H9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <button
          type="button"
          class="bg-purple-600 text-white  flex-none  mx-auto w-12 h-12 my-2 rounded-full ring-1 ring-slate-900/5 shadow-md flex items-center justify-center"
          aria-label="Pause"
        >
          <svg width="28" height="29" fill="currentColor">
            <rect x="6" y="4" width="3" height="22" rx="2" />
            <rect x="20" y="4" width="3" height="22" rx="2" />
          </svg>
        </button>
        <div class="flex-auto flex items-center justify-evenly">
          <button type="button" aria-label="Skip 10 seconds">
            <svg width="24" height="24" fill="none">
              <path
                d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="hidden sm:block lg:hidden xl:block"
            aria-label="Next"
          >
            <svg width="24" height="24" fill="none">
              <path
                d="M14 12 6 6v12l8-6Z"
                fill="currentColor"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 6v12"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            class="rounded-lg text-xs leading-6 font-semibold px-2 ring-2 ring-inset ring-slate-500 text-slate-500 "
          >
            1x
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrittanyPlaylistPlayer;

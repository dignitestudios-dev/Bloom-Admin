import React from "react";
import { useEffect } from "react";

const Error = ({ message, setVisibility, visibility }) => {
  useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    }, 3000);
  }, []);
  return (
    <div
      class={`max-w-96 min-w-48 fixed z-50 bottom-4 right-4 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg  ${
        visibility ? "block shake" : "hidden"
      }`}
      role="alert"
    >
      <div class="flex p-4">
        {message}
        <div class="ms-auto">
          <button
            type="button"
            onClick={() => setVisibility(false)}
            class="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
          >
            <span class="sr-only">Close</span>
            <svg
              class="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;

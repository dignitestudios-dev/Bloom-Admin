import React, { useContext, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { SlLike } from "react-icons/sl";
import { FaRegCommentDots } from "react-icons/fa";
import { LiaCommentDots } from "react-icons/lia";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import { GoKebabHorizontal } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import DeletionModal from "./DeletionModal";

const TextPostCard = ({ post, categoryId, setUpdate }) => {
  const [viewAll, setViewAll] = useState(false);
  const { error, setError, baseUrl, success, setSuccess } =
    useContext(AppContext);

  const [loading, setLoading] = useState(false);
  const deletePost = (postId) => {
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .delete(`${baseUrl}/api/post/${categoryId}/${postId}`, {
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
    <div class="bg-gray-50 w-full rounded-md relative border h-auto min-h-48  py-3 px-3 ">
      <DeletionModal
        showModal={showModal}
        setShowModal={setShowModal}
        loading={loading}
        action={() => deletePost(post?._id, post?.categoryId)}
      />
      <button
        onClick={() => setShowModal(true)}
        className="w-8 h-8 rounded-full bg-purple-600 z-50 text-white text-md flex items-center justify-center absolute top-2 right-2"
      >
        {loading ? <GoKebabHorizontal /> : <MdDeleteOutline />}
      </button>
      <span className="text-lg font-medium text-gray-700 pt-4 px-1">
        {post?.title}
      </span>
      <p className="w-[90%] text-sm font-normal text-gray-600 px-1">
        {post?.description?.length > 200
          ? post?.description?.slice(0, 200) + "..."
          : post?.description}
      </p>
      <div class="w-full h-8 flex items-center absolute bottom-1 left-0 px-3 mt-2">
        <div class="bg-blue-500 z-10 w-5 h-5 rounded-full flex items-center justify-center ">
          <svg
            class="w-3 h-3 fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#b0b0b0"
            stroke-width="2"
            stroke-linecap="square"
            stroke-linejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
        </div>

        <div class="w-full flex justify-between">
          <p class="ml-1 text-gray-500">{post?.likeCount}</p>
          <button
            onClick={() => setViewAll((prev) => !prev)}
            class="ml-1 text-gray-500 hover:underline"
          >
            {post?.commentsCount} comment
          </button>
        </div>
      </div>

      {/* <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
        {viewAll ? (
          <article class="w-full p-2 mb-2 text-base bg-purple-500/5 rounded-lg ">
            <footer class="flex justify-between items-center ">
              <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                  <img
                    class="mr-2 w-6 h-6 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="Jese Leos"
                  />
                  Jese Leos
                </p>
                <p class="text-sm text-gray-600 ">
                  <time
                    pubdate
                    datetime="2022-02-12"
                    title="February 12th, 2022"
                  >
                    Feb. 12, 2022
                  </time>
                </p>
              </div>
              <button
                id="dropdownComment2Button"
                data-dropdown-toggle="dropdownComment2"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500   rounded-lg  "
                type="button"
              >
                <svg
                  class="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span class="sr-only">Comment settings</span>
              </button>

              <div
                id="dropdownComment2"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
              >
                <ul
                  class="py-1 text-sm text-gray-700 "
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                      Edit
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                      Remove
                    </a>
                  </li>
                  <li>
                    <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            </footer>
            <p class="text-gray-700 ml-6 text-sm ">
              Much appreciated! Glad you liked it ☺️
            </p>
          </article>
        ) : (
          <>
            <article class="w-full p-2 mb-2 text-base bg-purple-500/5 rounded-lg ">
              <footer class="flex justify-between items-center ">
                <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos"
                    />
                    Jese Leos
                  </p>
                  <p class="text-sm text-gray-600 ">
                    <time
                      pubdate
                      datetime="2022-02-12"
                      title="February 12th, 2022"
                    >
                      Feb. 12, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment2Button"
                  data-dropdown-toggle="dropdownComment2"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500   rounded-lg  "
                  type="button"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span class="sr-only">Comment settings</span>
                </button>

                <div
                  id="dropdownComment2"
                  class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
                >
                  <ul
                    class="py-1 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                        Edit
                      </a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                        Remove
                      </a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p class="text-gray-700 ml-6 text-sm ">
                Much appreciated! Glad you liked it ☺️
              </p>
            </article>

            <article class="w-full p-2 mb-2 text-base bg-purple-500/5 rounded-lg ">
              <footer class="flex justify-between items-center ">
                <div class="flex items-center">
                  <p class="inline-flex items-center mr-3 text-sm text-gray-900  font-semibold">
                    <img
                      class="mr-2 w-6 h-6 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="Jese Leos"
                    />
                    Jese Leos
                  </p>
                  <p class="text-sm text-gray-600 ">
                    <time
                      pubdate
                      datetime="2022-02-12"
                      title="February 12th, 2022"
                    >
                      Feb. 12, 2022
                    </time>
                  </p>
                </div>
                <button
                  id="dropdownComment2Button"
                  data-dropdown-toggle="dropdownComment2"
                  class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500   rounded-lg  "
                  type="button"
                >
                  <svg
                    class="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                  <span class="sr-only">Comment settings</span>
                </button>

                <div
                  id="dropdownComment2"
                  class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
                >
                  <ul
                    class="py-1 text-sm text-gray-700 "
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                        Edit
                      </a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                        Remove
                      </a>
                    </li>
                    <li>
                      <a href="#" class="block py-2 px-4 hover:bg-gray-100 ">
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
              <p class="text-gray-700 ml-6 text-sm ">
                Much appreciated! Glad you liked it ☺️
              </p>
            </article>
          </>
        )}
      </div> */}
    </div>
  );
};

export default TextPostCard;

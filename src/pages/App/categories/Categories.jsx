import React, { useRef } from "react";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import DailyDevo from "./DailyDevo";
import SuperBoost from "./SuperBoost";
import BrittanyTalks from "./BrittanyTalks";
import BrittanyPlaylist from "./BrittanyPlaylist";
import Blooming from "./Blooming";
import BooksOfTheMonth from "./BooksOfTheMonth";
import Events from "./Events";
import Enrichment from "./Enrichment";

const Categories = () => {
  const [searchInput, setSearchInput] = useState("");
  const { baseUrl, navigate, setError } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [update, setUpdate] = useState(false);

  const getCategories = () => {
    const token = Cookies.get("token");

    if (token) {
      setCategoriesLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/api/category?events=true`, { headers }).then(
        (response) => {
          console.log(response);
          setCategories(response?.data?.data);
          setCategoriesLoading(false);
        },
        (error) => {
          setError(error?.response?.data?.message);
          setCategoriesLoading(false);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigate("Login", "/login");
          }
        }
      );
    } else {
      navigate("Login", "/login");
    }
  };

  useEffect(() => {
    getCategories();
  }, [update]);

  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);
  function convertName(name) {
    // Convert to lowercase and replace spaces with hyphens
    return name.toLowerCase().replace(/\s+/g, "-");
  }

  const [currentCategory, setCurrentCategory] = useState("Daily Devo");
  const buttonRef = useRef(null);

  const handleCategoryChange = (e, name, id) => {
    if (buttonRef?.current && !buttonRef?.current?.contains(e.target)) {
      setCurrentCategory(name);
      setCategoryId(id);
      console.log(name);
    }
  };

  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditModal = () => {
    setIsEditOpen((prev) => !prev);
  };

  const [categoryId, setCategoryId] = useState(categories[0]?._id);

  return (
    <div
      className={`w-full min-h-[92vh] h-[92vh] max-h-[92vh] -my-4   grid grid-cols-7  justify-start items-start `}
    >
      <div className="col-span-5 border-r p-3 h-full overflow-y-auto flex flex-col gap-4 justify-start items-start">
        {currentCategory == "Daily Devo" ? (
          <DailyDevo id={categoryId} />
        ) : currentCategory == "Super Boost" ? (
          <SuperBoost id={categoryId} />
        ) : currentCategory == "Brittany Talks" ? (
          <BrittanyTalks id={categoryId} />
        ) : currentCategory == "Brittany's Playlist" ? (
          <BrittanyPlaylist id={categoryId} />
        ) : currentCategory == "Blooming" ? (
          <Blooming id={categoryId} />
        ) : currentCategory == "Books of the Month" ? (
          <BooksOfTheMonth id={categoryId} />
        ) : currentCategory == "Enrichment" ? (
          <Enrichment id={categoryId} />
        ) : (
          currentCategory == "Events" && <Events id={categoryId} />
        )}
        {/* <div class="bg-white w-full rounded-md border h-auto py-1 px-3 ">
          <div class="w-full h-16 flex items-center  justify-between ">
            <div class="flex">
              <img
                class=" rounded-full w-10 h-10 mr-3"
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1828858886.1716668774&semt=ais_user"
                alt=""
              />
              <div>
                <h3 class="text-md font-semibold ">Jack Anderson</h3>
                <p class="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <svg
              class="w-16"
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <p className="w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi
            cum reiciendis velit labore id doloribus fugiat modi. Facere,
            placeat!
          </p>
          <div class="w-full h-8 flex items-center px-3 my-3">
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
              <p class="ml-1 text-gray-500">8</p>
              <p class="ml-1 text-gray-500">29 comment</p>
            </div>
          </div>
          <hr />
          <div class="w-full flex justify-start items-center gap-5  px-5 my-2">
            <button class="flex hover:bg-gray-50 rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span class="font-semibold text-md text-gray-600">Likes</span>
            </button>
            <button class="flex hover:bg-gray-50 rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span class="font-semibold text-md text-gray-600">Comment</span>
            </button>
          </div>
        </div> */}
        {/* <div class="bg-white w-full rounded-md border h-auto py-1 px-3 ">
          <div class="w-full h-16 flex items-center  justify-between ">
            <div class="flex">
              <img
                class=" rounded-full w-10 h-10 mr-3"
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1828858886.1716668774&semt=ais_user"
                alt=""
              />
              <div>
                <h3 class="text-md font-semibold ">Jack Anderson</h3>
                <p class="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <svg
              class="w-16"
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <div className="w-full h-64 bg-gray-500 rounded-md">
            <img
              src="https://images.unsplash.com/photo-1719836567938-f120c7e4c439?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              className="w-full h-full rounded-md"
            />
          </div>
          <p className="w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi
            cum reiciendis velit labore id doloribus fugiat modi. Facere,
            placeat!
          </p>
          <div class="w-full h-8 flex items-center px-3 my-3">
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
              <p class="ml-1 text-gray-500">8</p>
              <p class="ml-1 text-gray-500">29 comment</p>
            </div>
          </div>
          <hr />
          <div class="w-full flex justify-start items-center gap-5  px-5 my-2">
            <button class="flex hover:bg-gray-50 rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span class="font-semibold text-md text-gray-600">Likes</span>
            </button>
            <button class="flex hover:bg-gray-50 rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span class="font-semibold text-md text-gray-600">Comment</span>
            </button>
          </div>
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
        </div>
        <div class="bg-white w-full rounded-md border h-auto py-1 px-3 ">
          <div class="w-full h-16 flex items-center  justify-between ">
            <div class="flex">
              <img
                class=" rounded-full w-10 h-10 mr-3"
                src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?size=626&ext=jpg&ga=GA1.1.1828858886.1716668774&semt=ais_user"
                alt=""
              />
              <div>
                <h3 class="text-md font-semibold ">Jack Anderson</h3>
                <p class="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <svg
              class="w-16"
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
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
          <div className="w-full h-64 bg-gray-500 rounded-md">
            <img
              src="https://images.unsplash.com/photo-1719836567938-f120c7e4c439?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
              alt="image"
              className="w-full h-full rounded-md"
            />
          </div>
          <p className="w-[90%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic animi
            cum reiciendis velit labore id doloribus fugiat modi. Facere,
            placeat!
          </p>
          <div class="w-full h-8 flex items-center px-3 my-3">
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
              <p class="ml-1 text-gray-500">8</p>
              <p class="ml-1 text-gray-500">29 comment</p>
            </div>
          </div>
          <hr />
          <div class="w-full flex justify-start items-center gap-5  px-5 my-2">
            <button class="flex hover:bg-gray-50 rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
              </svg>
              <span class="font-semibold text-md text-gray-600">Likes</span>
            </button>
            <button class="flex hover:bg-gray-50 rounded-lg px-2 py-1 flex-row justify-start items-center w-auto space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#838383"
                stroke-width="2"
                stroke-linecap="square"
                stroke-linejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span class="font-semibold text-md text-gray-600">Comment</span>
            </button>
          </div>
        </div> */}
      </div>
      <div className="w-full h-auto overflow-y-auto  col-span-2 grid grid-cols-1  pl-3 py-3 justify-start items-start gap-2">
        {categoriesLoading
          ? arr.map((item) => {
              return (
                <div
                  key={item}
                  className="w-full hover:bg-purple-600/5 cursor-pointer bg-gray-100 animate-pulse border  rounded-lg   h-auto flex flex-col justify-start items-start gap-2"
                >
                  <div className="w-full   h-auto p-2  flex flex-col gap-6 justify-between items-start rounded-xl md:rounded-full  ">
                    <div className="w-full h-auto flex flex-col md:flex-row gap-3 md:gap-3 justify-between items-start md:items-center">
                      <div className="flex justify-start items-center gap-2">
                        <span className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></span>

                        <div className="w-auto flex flex-col gap-1 justify-start items-start">
                          <h1 className="text-sm  font-bold w-40 h-2 bg-gray-200 animate-pulse "></h1>
                          <span
                            className={`w-16 capitalize px-4 h-5 flex items-center justify-center rounded-md bg-gray-200 animate-pulse text-white text-xs font-medium`}
                          ></span>
                        </div>
                      </div>

                      <div className="w-full md:w-auto flex justify-start items-center gap-2">
                        <button className="w-16 capitalize px-4 h-6 flex items-center justify-center rounded-full bg-gray-200 animate-pulse text-white text-xs font-medium"></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : categories?.map((category, key) => {
              return (
                <button
                  onClick={(e) =>
                    handleCategoryChange(e, category?.name, category?._id)
                  }
                  className="w-full hover:bg-purple-600/5 cursor-pointer bg-white border  rounded-lg   h-auto flex flex-col justify-start items-start gap-2"
                >
                  <div className="w-full   h-auto p-2  flex flex-col gap-6 justify-between items-start rounded-xl md:rounded-full  ">
                    <div className="w-full h-auto flex flex-col md:flex-row gap-3 md:gap-3 justify-between items-start md:items-center">
                      <div className="flex justify-start items-center gap-2">
                        <img
                          className="h-12 w-12 rounded-md"
                          src={
                            category?.picture
                              ? category?.picture
                              : "https://images.unsplash.com/photo-1511113897571-447d6bc7b6b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHB1cnBsZXxlbnwwfHwwfHx8MA%3D%3D"
                          }
                          // src={
                          //   "https://images.unsplash.com/photo-1511113897571-447d6bc7b6b1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fHB1cnBsZXxlbnwwfHwwfHx8MA%3D%3D"
                          // }
                          alt="category image"
                        />

                        <div className="w-auto flex flex-col gap-1 justify-start items-start">
                          <h1 className="text-sm  font-bold ">
                            {category?.name}
                          </h1>
                          {category?.name !== "Events" ? (
                            <span
                              className={`w-auto capitalize px-4 h-5 flex items-center justify-center rounded-md ${
                                category?.status == "paid"
                                  ? "bg-green-400/5 text-green-400 border border-green-400"
                                  : "bg-blue-400/5 text-blue-400 border border-blue-400"
                              }  text-xs font-medium`}
                            >
                              {category?.status}
                            </span>
                          ) : (
                            <span
                              className={`w-auto capitalize px-4 h-5 flex items-center justify-center rounded-md  text-xs font-medium`}
                            ></span>
                          )}
                        </div>
                      </div>

                      <div className="w-full md:w-auto flex justify-start items-center gap-2">
                        <button
                          ref={buttonRef}
                          onClick={toggleEditModal}
                          className="w-auto capitalize px-4 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white text-xs font-medium"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
};

export default Categories;

import React, { useState } from "react";
import DailyDevoCreatePost from "../../components/create post/DailyDevoCreatePost";
import SuperBoostCreatePost from "../../components/create post/SuperBoostCreatePost";
import BrittanyTalksCreatePost from "../../components/create post/BrittanyTalksCreatePost";
import BrittanyPlaylistCreatePost from "../../components/create post/BrittanyPlaylistCreatePost";
import BloomingCreatePost from "../../components/create post/BloomingCreatePost";
import BooksOfMonthCreatePost from "../../components/create post/BooksOfMonthCreatePost";
import EnrichmentCreatePost from "../../components/create post/EnrichmentCreatePost";
import EventsCreatePost from "../../components/create post/EventsCreatePost";
import { useContext } from "react";

import Cookies from "js-cookie";
import axios from "axios";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const CreatePost = () => {
  const [category, setCategory] = useState("daily devo");
  const [categoryId, setCategoryId] = useState(null);
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
          setCategories(response?.data?.data);
          setCategoryId(response?.data?.data[0]?._id);
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
  return (
    <div
      className={`w-full min-h-[60vh] grid grid-cols-7  justify-start items-start `}
    >
      <div className="w-full h-full col-span-5   flex justify-center items-start bg-white  rounded-l-3xl border-l border-y p-4">
        <div className="w-full h-auto  flex flex-col justify-start items-start gap-2">
          {category == "daily devo" ? (
            <DailyDevoCreatePost id={categoryId} />
          ) : category == "super boost" ? (
            <SuperBoostCreatePost id={categoryId} />
          ) : category == "brittany talks" ? (
            <BrittanyTalksCreatePost id={categoryId} />
          ) : category == "brittany's playlist" ? (
            <BrittanyPlaylistCreatePost id={categoryId} />
          ) : category == "blooming" ? (
            <BloomingCreatePost id={categoryId} />
          ) : category == "books of the month" ? (
            <BooksOfMonthCreatePost id={categoryId} />
          ) : category == "enrichment" ? (
            <EnrichmentCreatePost id={categoryId} />
          ) : (
            category == "events" && <EventsCreatePost id={categoryId} />
          )}
        </div>
      </div>

      <div className="w-full h-full col-span-2 flex justify-center items-start bg-white   rounded-r-3xl border-x border-y p-4">
        <div className="w-full h-auto grid grid-rows-7 grid-cols-1 justify-start items-start gap-3">
          {categories?.map((category, index) => {
            return (
              <button
                autoFocus={category?.name == "Daily Devo"}
                onClick={() => {
                  setCategory(category?.name?.toLowerCase());
                  setCategoryId(category?._id);
                }}
                className={`w-full rounded-full outline-none text-sm focus:ring focus:ring-purple-200 h-12  focus:bg-purple-500 focus:text-white ${
                  category == category?.name?.toLowerCase()
                    ? "bg text-white"
                    : "bg-gray-100 text-[#191919]"
                } font-medium text-md`}
              >
                {category?.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

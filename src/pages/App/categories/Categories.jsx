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
import TextPost from "./TextPost";
import { CiEdit } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import PostModal from "../../../components/categories/PostModal";
const Categories = () => {
  const [searchInput, setSearchInput] = useState("");
  const { baseUrl, navigate, setError } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const location = useLocation();
  const { open = false, id = null, category = null } = location?.state || {};
  const [modalOpen, setModalOpen] = useState(open);
  const [postId, setPostId] = useState(id);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [categoryId, setCategoryId] = useState();

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
          console.log(categoryId);
          // if (categoryId !== undefined || categoryId !== null) {
          //   setCategoryId(categoryId);
          // } else {
          //   setCategoryId(response?.data?.data[0]._id);
          // }
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
    }
  };

  useEffect(() => {
    setCategoryId(category);
  }, []);

  const [image, setImage] = useState(null);

  const [imageBase, setImageBase] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [catId, setCatId] = useState(null);

  const handleImage = (e, id) => {
    const elem = document.getElementById("image");
    setCatId(id);
    elem.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase(reader.result);
      };
      reader.readAsDataURL(file);
      setImageError(false);
      setImage(file);
    }
  };

  const handleImageSubmit = () => {
    const formdata = new FormData();
    formdata.append("picture", image);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };

    axios
      .put(`${baseUrl}/api/category/${catId}`, formdata, { headers })
      .then((response) => {
        setUpdate((prev) => !prev);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    image && handleImageSubmit();
  }, [image]);

  return (
    <div
      className={`w-full min-h-[92vh] h-[92vh] max-h-[92vh] -my-4   grid grid-cols-7  justify-start items-start `}
    >
      {modalOpen && (
        <PostModal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          postId={postId}
        />
      )}
      <input
        onChange={handleImageChange}
        type="file"
        accept="image/*"
        className="hidden"
        id="image"
      />
      <div className="col-span-5 border-r py-3 pr-3 pl-0 h-full overflow-y-auto flex flex-col gap-4 justify-start items-start">
        {currentCategory == "Daily Devo" ? (
          <DailyDevo
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Super Boost" ? (
          <SuperBoost
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Brittany Talks" ? (
          <BrittanyTalks
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Brittany's Playlist" ? (
          <BrittanyPlaylist
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Blooming" ? (
          <Blooming
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Books of the Month" ? (
          <BooksOfTheMonth
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Enrichment" ? (
          <Enrichment
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : currentCategory == "Post" ? (
          <TextPost
            id={categoryId}
            setPostId={setPostId}
            setCommentOpen={setModalOpen}
          />
        ) : (
          currentCategory == "Events" && (
            <Events
              id={categoryId}
              setPostId={setPostId}
              setCommentOpen={setModalOpen}
            />
          )
        )}
      </div>
      <div className="w-full h-auto max-h-full overflow-y-hidden  col-span-2 grid grid-cols-1  pl-3 py-3 justify-start items-start gap-2">
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
                <div
                  key={key}
                  className={`w-full group flex hover:bg-purple-600/20 ${
                    categoryId == category?._id && "bg-purple-600/20"
                  } border pr-1 h-auto justify-start items-center gap-2 rounded-lg`}
                >
                  <button
                    onClick={(e) => {
                      handleCategoryChange(e, category?.name, category?._id);
                    }}
                    className="w-[80%]  cursor-pointer       h-auto flex flex-col justify-start items-start gap-2"
                  >
                    <div className="w-full   h-auto p-2  flex flex-col gap-6 justify-between items-start rounded-xl md:rounded-full  ">
                      <div className="w-full h-auto flex flex-col md:flex-row gap-3 md:gap-3 justify-between items-start md:items-center">
                        <div className="flex relative justify-start items-center gap-2">
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
                      </div>
                    </div>
                  </button>
                  <div className="w-[15%] flex justify-start items-center gap-2">
                    <button
                      ref={buttonRef}
                      onClick={(e) => {
                        handleImage(e, category?._id);
                      }}
                      className="w-auto capitalize px-4 h-6 flex items-center justify-center rounded-full bg-purple-500 text-white text-xs font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Categories;

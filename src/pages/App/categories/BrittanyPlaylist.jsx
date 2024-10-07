import BrittanyPlaylistPlayer from "../../../components/categories/BrittanyPlaylistPlayer";
import BrittanyPlaylistCard from "../../../components/categories/BrittanyPlaylistCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../../context/AppContext";
import { FaRegEdit } from "react-icons/fa";

const BrittanyPlaylist = ({ id }) => {
  const { error, setError, baseUrl, navigate } = useContext(AppContext);
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageError, setImageError] = useState(false);

  const [search, setSearch] = useState("");

  const getAllposts = () => {
    setPostsLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/brittanyPlaylist`, { headers })
      .then((response) => {
        setPosts(response?.data?.data?.songs);
        setPlaylist(response?.data?.data?.playlist);
        setPostsLoading(false);
      })
      .catch((error) => {
        setPostsLoading(false);
        setError(error?.response?.data?.message);
      });
  };
  const [title, setTitle] = useState("");
  useEffect(() => {
    id && getAllposts();
  }, [reload, id]);

  useEffect(() => {
    setTitle(playlist?.title);
    setImageUrl(playlist?.cover);
  }, [posts]);

  const updatePlaylist = () => {
    if (Cookies.get("token")) {
      const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
      };
      const formdata = new FormData();
      formdata.append("title", title);
      formdata.append("cover", image);
      axios
        .post(`${baseUrl}/api/playlist`, formdata, { headers })
        .then((response) => {
          setReload((prev) => !prev);
        })
        .catch((error) => {
          setError(error?.response?.data?.message);
        });
    } else {
      navigate("Login", "/login");
    }
  };

  const handleImageClick = () => {
    const elem = document.getElementById("playlist_image");
    elem.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setImageError(false);
      setImage(file);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      {/* <BrittanyPlaylistPlayer /> */}
      <div className="w-full border rounded-2xl p-4 flex justify-start items-center gap-3">
        <div className="w-24 h-24 rounded-xl relative flex items-center justify-center">
          <button
            onClick={() => handleImageClick()}
            className="w-6 h-6 rounded-full flex items-center bg-white text-purple-600 cursor-pointer justify-center text-xs font-medium absolute top-2 right-2"
          >
            <FaRegEdit />
          </button>
          <img
            src={imageUrl}
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />

          <input
            type="file"
            id="playlist_image"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageChange(e)}
            className="hidden"
          />
        </div>
        <div className="w-auto flex flex-col gap-2 justify-start items-start">
          <div className="w-auto flex flex-col relative justify-start items-start gap-[1px]">
            <span
              htmlFor="title"
              className="text-gray-900 text-sm absolute -top-3 flex items-center justify-start h-6 left-3 bg-white z-10 font-medium"
            >
              Playlist Title
            </span>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-96 h-12 rounded-xl border outline-none px-3 "
            />
          </div>
          <button
            onClick={() => updatePlaylist()}
            className="w-32 h-9 rounded-xl flex items-center justify-center text-md font-medium text-white bg-purple-600"
          >
            Update
          </button>
        </div>
      </div>
      {/* <div className="w-full h-12 flex justify-start items-center gap-2  relative">
        <input
          type="text"
          id="name"
          placeholder="e.g. John Smith"
          className="mt-2 block w-full rounded-full border border-gray-200 px-3 h-12 shadow-sm outline-none focus:border-gradient focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />

        <button className="active:scale-95 absolute right-1 top-2 rounded-full bg-purple-500 px-8 h-10 font-medium text-white outline-none   hover:opacity-90">
          Search
        </button>
      </div> */}
      <div className="w-full h-full grid grid-cols-3 gap-4 justify-start items-start">
        {posts?.map((post, index) => {
          return <BrittanyPlaylistCard key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default BrittanyPlaylist;

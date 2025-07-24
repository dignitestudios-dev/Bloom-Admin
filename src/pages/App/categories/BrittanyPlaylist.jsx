import BrittanyPlaylistPlayer from "../../../components/categories/BrittanyPlaylistPlayer";
import BrittanyPlaylistCard from "../../../components/categories/BrittanyPlaylistCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../../context/AppContext";
import { FaRegEdit } from "react-icons/fa";
import Loader from "../../../components/global/Loader";

const BrittanyPlaylist = ({ id, setPostId, setCommentOpen }) => {
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
      .get(`${baseUrl}/admin/playlist`, { headers })
      .then((response) => {
        setPosts(response?.data?.data?.songs?.reverse());
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
      {title && (
        <div className="w-full border rounded-2xl p-4 flex justify-center bg items-center gap-3">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
      )}

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
        {postsLoading && (
          <div className="w-full col-span-4 h-[90vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!postsLoading && posts?.length > 0
          ? posts?.map((post, index) => {
              return (
                <BrittanyPlaylistCard
                  key={index}
                  getAllposts={getAllposts}
                  post={post}
                  setPostId={setPostId}
                  setCommentOpen={setCommentOpen}
                />
              );
            })
          : !postsLoading && (
              <div className="w-full col-span-3 h-[90vh] flex items-center justify-center">
                <img src="/no-data.jpg" alt="" className="h-96" />
              </div>
            )}
      </div>
    </div>
  );
};

export default BrittanyPlaylist;

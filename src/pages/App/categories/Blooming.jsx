import BloomingPostCard from "../../../components/categories/BloomingPostCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../../context/AppContext";
const Blooming = ({ id }) => {
  const { error, setError, baseUrl } = useContext(AppContext);
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");

  const getAllposts = () => {
    setPostsLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/blooming`, { headers })
      .then((response) => {
        setPosts(response?.data?.data);
        setPostsLoading(false);
      })
      .catch((error) => {
        setPostsLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    id && getAllposts();
  }, [reload, id]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
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
          return <BloomingPostCard key={index} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Blooming;

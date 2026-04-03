import BrittanyPlaylistCard from "../../../components/categories/BrittanyPlaylistCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../../context/AppContext";
import Loader from "../../../components/global/Loader";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";

const BrittanyPlaylist = ({ id }) => {
  const { setError, baseUrl } = useContext(AppContext);
  const [postsLoading, setPostsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const getAllposts = (currentPage = page) => {
    setPostsLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/brittanyPlaylist?page=${currentPage}&limit=${limit}`, {
        headers,
      })
      .then((response) => {
        setPosts(response?.data?.data || []);
        setTotalPages(response?.data?.totalPages || 1);
        setPostsLoading(false);
      })
      .catch((error) => {
        setPostsLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllposts(page);
  }, [page, id]);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-4">
      <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-start items-start">
        {postsLoading && (
          <div className="w-full col-span-3 h-[90vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!postsLoading && posts?.length > 0
          ? posts.map((post) => (
              <BrittanyPlaylistCard
                key={post?._id}
                post={post}
                getAllposts={() => getAllposts(page)}
              />
            ))
          : !postsLoading && (
              <div className="w-full col-span-3 h-[90vh] flex items-center justify-center">
                <img src="/no-data.jpg" alt="" className="h-96" />
              </div>
            )}
      </div>

      {!postsLoading && totalPages > 1 && (
        <div className="w-full flex justify-center items-center gap-3 mt-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-40 hover:bg-purple-50"
          >
            <RxCaretLeft size={22} />
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-40 hover:bg-purple-50"
          >
            <RxCaretRight size={22} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BrittanyPlaylist;

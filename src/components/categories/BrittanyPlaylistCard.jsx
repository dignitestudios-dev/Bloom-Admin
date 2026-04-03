import React, { useState } from "react";
import { FaApple, FaSpotify } from "react-icons/fa";
import { MdMusicNote, MdOutlineVisibility } from "react-icons/md";
import BrittanyPlaylistViewModal from "./BrittanyPlaylistViewModal";

const BrittanyPlaylistCard = ({ post, getAllposts }) => {
  const [showModal, setShowModal] = useState(false);

  const truncate = (text, max) =>
    text?.length > max ? `${text.slice(0, max)}...` : text;

  return (
    <>
      <BrittanyPlaylistViewModal
        showModal={showModal}
        setShowModal={setShowModal}
        playlistId={post?._id}
        onUpdated={getAllposts}
      />

      <div className="bg-white w-full relative shadow rounded-2xl border p-3 flex flex-col gap-3">
        <div className="h-52 relative overflow-hidden rounded-xl bg-gray-50">
          <img
            className="w-full h-full object-cover"
            src={post?.cover}
            alt={post?.title || "Playlist cover"}
          />
          <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
            <MdMusicNote size={12} />
            {post?.songCount ?? 0} song{(post?.songCount ?? 0) === 1 ? "" : "s"}
          </span>
        </div>

        <div className="px-1 flex flex-col gap-1.5 flex-1">
          <h3 className="text-[#0e0e0e] text-lg font-semibold leading-snug">
            {truncate(post?.title, 40)}
          </h3>

          <p className="text-gray-600 text-xs leading-relaxed">
            {truncate(post?.description, 90)}
          </p>
        </div>

        <div className="w-full flex items-center gap-2 px-1 pt-1 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="h-9 px-3 rounded-full border border-purple-200 text-purple-600 text-xs font-medium flex items-center justify-center gap-1.5 hover:bg-purple-50 transition"
          >
            <MdOutlineVisibility size={14} />
            View
          </button>

          {post?.appleMusicUrl && (
            <a
              href={post.appleMusicUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 h-9 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-red-600 text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:opacity-90 transition"
            >
              <FaApple size={14} />
              Apple
            </a>
          )}
          {post?.spotifyUrl && (
            <a
              href={post.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 h-9 rounded-full bg-[#1DB954] text-white text-xs font-medium flex items-center justify-center gap-1.5 hover:opacity-90 transition"
            >
              <FaSpotify size={14} />
              Spotify
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default BrittanyPlaylistCard;

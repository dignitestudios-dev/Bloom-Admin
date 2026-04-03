import React, { useContext, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { MdClose, MdMusicNote } from "react-icons/md";
import { FaSpotify, FaApple } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { IoMusicalNotesOutline } from "react-icons/io5";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import BtnLoader from "../global/BtnLoader";
import { brittanyplaylist } from "../../data/create/brittanyplaylist";
import { brittanyplaylistcreate } from "../../schemas/create/BrittanyPlaylist";

const emptySong = {
  songName: "",
  artistName: "",
  appleMusicUrl: "",
  spotifyUrl: "",
};

const BrittanyPlaylistCreatePost = ({ id }) => {
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [coverError, setCoverError] = useState(false);
  const [songArtworks, setSongArtworks] = useState([
    { file: null, preview: null, error: false },
  ]);

  const { baseUrl, setError, setSuccess } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setCoverError(false);
      setCover(file);
    }
  };

  const handleSongArtworkChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSongArtworks((prev) => {
        const next = [...prev];
        next[index] = { file, preview: reader.result, error: false };
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: brittanyplaylist,
    validationSchema: brittanyplaylistcreate,
    onSubmit: async (formValues) => {
      let hasError = false;

      if (!cover) {
        setCoverError("Cover photo is required.");
        hasError = true;
      }

      const nextArtworks = songArtworks.map((item) => {
        if (!item.file) {
          hasError = true;
          return { ...item, error: "Song artwork is required." };
        }
        return { ...item, error: false };
      });
      setSongArtworks(nextArtworks);

      if (hasError) return;

      setLoading(true);
      const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
      };
      const formdata = new FormData();

      formdata.append("title", formValues.title?.trim());
      formdata.append("description", formValues.description?.trim());
      formdata.append("appleMusicUrl", formValues.appleMusicUrl?.trim());
      formdata.append("spotifyUrl", formValues.spotifyUrl?.trim());
      formdata.append("categoryId", id);
      formdata.append("cover", cover);

      const songsPayload = formValues.songs.map((song) => ({
        songName: song.songName?.trim(),
        artistName: song.artistName?.trim(),
        appleMusicUrl: song.appleMusicUrl?.trim(),
        spotifyUrl: song.spotifyUrl?.trim(),
      }));
      formdata.append("songs", JSON.stringify(songsPayload));

      songArtworks.forEach((item) => {
        formdata.append("artwork", item.file);
      });

      try {
        await axios.post(`${baseUrl}/api/playlist`, formdata, {
          headers,
        });
        setSuccess("Playlist Updated Successfully.");
        resetForm();
        setCover(null);
        setCoverPreview(null);
        setCoverError(false);
        setSongArtworks([{ file: null, preview: null, error: false }]);
        setLoading(false);
      } catch (error) {
        setError(error?.response?.data?.message);
        setLoading(false);
      }
    },
  });

  const addSong = () => {
    setFieldValue("songs", [...values.songs, { ...emptySong }]);
    setSongArtworks((prev) => [
      ...prev,
      { file: null, preview: null, error: false },
    ]);
  };

  const removeSong = (index) => {
    if (values.songs.length === 1) return;
    setFieldValue(
      "songs",
      values.songs.filter((_, i) => i !== index)
    );
    setSongArtworks((prev) => prev.filter((_, i) => i !== index));
  };

  const getSongError = (index, field) =>
    errors.songs?.[index]?.[field] && touched.songs?.[index]?.[field]
      ? errors.songs[index][field]
      : null;

  const inputClass = (hasError) =>
    `w-full h-12 rounded-2xl bg-gray-50 border outline-none focus:border-purple-400 transition ${
      hasError ? "border-red-600 shake" : "border-gray-200"
    } px-4`;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col justify-start items-start gap-5"
    >
      <div className="w-full h-32 rounded-2xl flex flex-col justify-center items-center gap-1 text-white bg">
        <IoMusicalNotesOutline className="text-4xl opacity-90" />
        <h1 className="text-3xl font-bold">Brittany's Playlist</h1>
        <p className="text-sm text-white/80">Create & manage playlist details</p>
      </div>

      {/* Cover */}
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
            <CiImageOn className="text-lg text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Playlist Cover
            </h3>
            <p className="text-xs text-gray-500">JPG or PNG recommended</p>
          </div>
        </div>

        <div
          className={`w-full h-44 rounded-2xl cursor-pointer bg-gray-50 border border-dashed flex flex-col justify-center items-center overflow-hidden transition hover:border-purple-300 ${
            coverError ? "border-red-500" : "border-gray-300"
          }`}
          onClick={() => document.getElementById("playlist-cover-add").click()}
        >
          <input
            id="playlist-cover-add"
            className="hidden"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleCoverChange}
          />
          {coverPreview ? (
            <img
              src={coverPreview}
              alt="Playlist cover"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="flex flex-col items-center gap-1 px-4 text-center">
              <CiImageOn className="text-4xl text-gray-400" />
              <span className="text-sm font-semibold text-gray-600">
                Click to upload cover photo
              </span>
              <span className="text-xs text-gray-400">
                Square image looks best
              </span>
            </div>
          )}
        </div>
        {coverError && (
          <p className="text-red-700 text-sm font-medium">{coverError}</p>
        )}
      </div>

      {/* Basic info */}
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800">Playlist Details</h3>

        <div className="w-full flex flex-col gap-[2px]">
          <label
            htmlFor="title"
            className="text-sm ml-1 text-gray-700 font-medium"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Brittany's Worship Playlist"
            className={inputClass(errors.title && touched.title)}
          />
          {errors.title && touched.title && (
            <p className="text-red-700 text-sm font-medium">{errors.title}</p>
          )}
        </div>

        <div className="w-full flex flex-col gap-[2px]">
          <label
            htmlFor="description"
            className="text-sm ml-1 text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Description of the playlist."
            className={`w-full h-28 resize-none rounded-2xl bg-gray-50 border outline-none focus:border-purple-400 transition p-4 ${
              errors.description && touched.description
                ? "border-red-600 shake"
                : "border-gray-200"
            }`}
          />
          {errors.description && touched.description && (
            <p className="text-red-700 text-sm font-medium">
              {errors.description}
            </p>
          )}
        </div>
      </div>

      {/* Streaming links */}
      <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 flex flex-col gap-4 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-800">Streaming Links</h3>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Apple Music */}
          <div className="w-full flex flex-col gap-[2px]">
            <label
              htmlFor="appleMusicUrl"
              className="text-sm ml-1 text-gray-700 font-medium flex items-center gap-2"
            >
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-red-600 flex items-center justify-center">
                <FaApple className="text-white text-sm" />
              </span>
              Apple Music URL
            </label>
            <input
              type="text"
              name="appleMusicUrl"
              id="appleMusicUrl"
              value={values.appleMusicUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://music.apple.com/..."
              className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus:border-pink-400 transition px-4 ${
                errors.appleMusicUrl && touched.appleMusicUrl
                  ? "border-red-600 shake"
                  : "border-gray-200"
              }`}
            />
            {errors.appleMusicUrl && touched.appleMusicUrl && (
              <p className="text-red-700 text-sm font-medium">
                {errors.appleMusicUrl}
              </p>
            )}
          </div>

          {/* Spotify */}
          <div className="w-full flex flex-col gap-[2px]">
            <label
              htmlFor="spotifyUrl"
              className="text-sm ml-1 text-gray-700 font-medium flex items-center gap-2"
            >
              <span className="w-6 h-6 rounded-full bg-[#1DB954] flex items-center justify-center">
                <FaSpotify className="text-white text-sm" />
              </span>
              Spotify URL
            </label>
            <input
              type="text"
              name="spotifyUrl"
              id="spotifyUrl"
              value={values.spotifyUrl}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="https://open.spotify.com/..."
              className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus:border-green-400 transition px-4 ${
                errors.spotifyUrl && touched.spotifyUrl
                  ? "border-red-600 shake"
                  : "border-gray-200"
              }`}
            />
            {errors.spotifyUrl && touched.spotifyUrl && (
              <p className="text-red-700 text-sm font-medium">
                {errors.spotifyUrl}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Songs */}
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <MdMusicNote className="text-lg text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Songs</h3>
              <p className="text-xs text-gray-500">
                {values.songs.length} song
                {values.songs.length > 1 ? "s" : ""} added
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addSong}
            className="px-4 h-9 rounded-full bg-purple-500 hover:bg-purple-600 transition text-white text-sm font-medium flex items-center gap-1.5"
          >
            <FiPlus size={16} />
            Add Song
          </button>
        </div>

        {values.songs.map((song, index) => (
          <div
            key={index}
            className="w-full border border-gray-100 rounded-2xl p-4 flex flex-col gap-4 bg-white shadow-sm"
          >
            <div className="w-full flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-500 text-white text-xs flex items-center justify-center">
                  {index + 1}
                </span>
                Song {index + 1}
              </span>
              {values.songs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSong(index)}
                  className="text-red-500 hover:bg-red-50 rounded-full px-2 py-1 flex items-center gap-1 text-sm font-medium transition"
                >
                  <MdClose size={16} />
                  Remove
                </button>
              )}
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4">
              <div className="flex flex-col gap-1">
                <div
                  className={`w-full h-40 md:h-full min-h-[140px] rounded-2xl cursor-pointer bg-gray-50 border border-dashed flex flex-col justify-center items-center overflow-hidden transition hover:border-purple-300 ${
                    songArtworks[index]?.error
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() =>
                    document.getElementById(`song-artwork-${index}`).click()
                  }
                >
                  <input
                    id={`song-artwork-${index}`}
                    className="hidden"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e) => handleSongArtworkChange(index, e)}
                  />
                  {songArtworks[index]?.preview ? (
                    <img
                      src={songArtworks[index].preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 px-2 text-center">
                      <CiImageOn className="text-3xl text-gray-400" />
                      <span className="text-xs font-semibold text-gray-600">
                        Artwork
                      </span>
                      <span className="text-[10px] text-gray-400">
                        jpg / png
                      </span>
                    </div>
                  )}
                </div>
                {songArtworks[index]?.error && (
                  <p className="text-red-700 text-xs font-medium">
                    {songArtworks[index].error}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <div className="w-full flex flex-col gap-[2px]">
                  <label
                    htmlFor={`songs.${index}.songName`}
                    className="text-sm ml-1 text-gray-700 font-medium"
                  >
                    Song Name
                  </label>
                  <input
                    type="text"
                    name={`songs.${index}.songName`}
                    id={`songs.${index}.songName`}
                    value={song.songName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Way Maker"
                    className={inputClass(getSongError(index, "songName"))}
                  />
                  {getSongError(index, "songName") && (
                    <p className="text-red-700 text-sm font-medium">
                      {getSongError(index, "songName")}
                    </p>
                  )}
                </div>

                <div className="w-full flex flex-col gap-[2px]">
                  <label
                    htmlFor={`songs.${index}.artistName`}
                    className="text-sm ml-1 text-gray-700 font-medium"
                  >
                    Artist Name
                  </label>
                  <input
                    type="text"
                    name={`songs.${index}.artistName`}
                    id={`songs.${index}.artistName`}
                    value={song.artistName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Sinach"
                    className={inputClass(getSongError(index, "artistName"))}
                  />
                  {getSongError(index, "artistName") && (
                    <p className="text-red-700 text-sm font-medium">
                      {getSongError(index, "artistName")}
                    </p>
                  )}
                </div>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="w-full flex flex-col gap-[2px]">
                    <label
                      htmlFor={`songs.${index}.appleMusicUrl`}
                      className="text-sm ml-1 text-gray-700 font-medium flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-red-600 flex items-center justify-center">
                        <FaApple className="text-white text-[10px]" />
                      </span>
                      Apple Music URL
                    </label>
                    <input
                      type="text"
                      name={`songs.${index}.appleMusicUrl`}
                      id={`songs.${index}.appleMusicUrl`}
                      value={song.appleMusicUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="https://music.apple.com/..."
                      className={inputClass(
                        getSongError(index, "appleMusicUrl")
                      )}
                    />
                    {getSongError(index, "appleMusicUrl") && (
                      <p className="text-red-700 text-sm font-medium">
                        {getSongError(index, "appleMusicUrl")}
                      </p>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-[2px]">
                    <label
                      htmlFor={`songs.${index}.spotifyUrl`}
                      className="text-sm ml-1 text-gray-700 font-medium flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#1DB954] flex items-center justify-center">
                        <FaSpotify className="text-white text-[10px]" />
                      </span>
                      Spotify URL
                    </label>
                    <input
                      type="text"
                      name={`songs.${index}.spotifyUrl`}
                      id={`songs.${index}.spotifyUrl`}
                      value={song.spotifyUrl}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="https://open.spotify.com/..."
                      className={inputClass(getSongError(index, "spotifyUrl"))}
                    />
                    {getSongError(index, "spotifyUrl") && (
                      <p className="text-red-700 text-sm font-medium">
                        {getSongError(index, "spotifyUrl")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 hover:bg-purple-600 transition text-white text-[16px] font-bold"
      >
        {loading ? <BtnLoader /> : "Update Playlist"}
      </button>
    </form>
  );
};

export default BrittanyPlaylistCreatePost;

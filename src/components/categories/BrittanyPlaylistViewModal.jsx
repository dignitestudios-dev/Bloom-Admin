import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { IoIosCloseCircle } from "react-icons/io";
import { FaApple, FaSpotify } from "react-icons/fa";
import { MdClose, MdEdit, MdMusicNote } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { AppContext } from "../../context/AppContext";
import Loader from "../global/Loader";
import BtnLoader from "../global/BtnLoader";

const BrittanyPlaylistViewModal = ({
  showModal,
  setShowModal,
  playlistId,
  onUpdated,
}) => {
  const { baseUrl, setError, setSuccess } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [appleMusicUrl, setAppleMusicUrl] = useState("");
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [editSongs, setEditSongs] = useState([]);

  const fetchPlaylist = () => {
    if (!playlistId) return;
    setLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/api/brittanyPlaylist/${playlistId}?page=1&limit=50`, {
        headers,
      })
      .then((response) => {
        const playlistData = response?.data?.data?.playlist || null;
        const songsData = response?.data?.data?.songs || [];
        setPlaylist(playlistData);
        setSongs(songsData);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    if (!showModal || !playlistId) return;
    setIsEditing(false);
    setCoverFile(null);
    fetchPlaylist();
  }, [showModal, playlistId]);

  const startEditing = () => {
    setTitle(playlist?.title || "");
    setDescription(playlist?.description || "");
    setAppleMusicUrl(playlist?.appleMusicUrl || "");
    setSpotifyUrl(playlist?.spotifyUrl || "");
    setCoverFile(null);
    setCoverPreview(playlist?.cover || null);
    setEditSongs(
      songs.map((song) => ({
        _id: song._id,
        songName: song.songName || "",
        artistName: song.artistName || "",
        appleMusicUrl: song.appleMusicUrl || "",
        spotifyUrl: song.spotifyUrl || "",
        artworkFile: null,
        artworkPreview: song.songArtwork || null,
        isNew: false,
        error: "",
      }))
    );
    setIsEditing(true);
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setCoverPreview(reader.result);
    reader.readAsDataURL(file);
    setCoverFile(file);
  };

  const handleSongArtworkChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditSongs((prev) => {
        const next = [...prev];
        next[index] = {
          ...next[index],
          artworkFile: file,
          artworkPreview: reader.result,
          error: "",
        };
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const addNewSong = () => {
    setEditSongs((prev) => [
      ...prev,
      {
        songName: "",
        artistName: "",
        appleMusicUrl: "",
        spotifyUrl: "",
        artworkFile: null,
        artworkPreview: null,
        isNew: true,
        error: "",
      },
    ]);
  };

  const removeSong = (index) => {
    setEditSongs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSongField = (index, field, value) => {
    setEditSongs((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Please enter playlist title.");
      return;
    }
    if (editSongs.length === 0) {
      setError("Please add at least one song.");
      return;
    }

    let hasError = false;
    const validatedSongs = editSongs.map((song) => {
      if (!song.songName?.trim() || !song.artistName?.trim()) {
        hasError = true;
        return { ...song, error: "Song name and artist are required." };
      }
      if (song.isNew && !song.artworkFile) {
        hasError = true;
        return { ...song, error: "Artwork is required for new songs." };
      }
      return { ...song, error: "" };
    });
    setEditSongs(validatedSongs);
    if (hasError) return;

    setSaving(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    const formdata = new FormData();

    formdata.append("title", title.trim());
    formdata.append("description", description.trim());
    formdata.append("appleMusicUrl", appleMusicUrl.trim());
    formdata.append("spotifyUrl", spotifyUrl.trim());
    if (coverFile) {
      formdata.append("cover", coverFile);
    }

    const songsPayload = editSongs.map((song) => {
      const item = {
        songName: song.songName.trim(),
        artistName: song.artistName.trim(),
      };
      if (song.appleMusicUrl?.trim()) {
        item.appleMusicUrl = song.appleMusicUrl.trim();
      }
      if (song.spotifyUrl?.trim()) {
        item.spotifyUrl = song.spotifyUrl.trim();
      }
      if (!song.isNew && song._id) {
        item._id = song._id;
      }
      return item;
    });
    formdata.append("songs", JSON.stringify(songsPayload));

    // Existing songs with updated artwork → artwork
    editSongs.forEach((song) => {
      if (!song.isNew && song.artworkFile) {
        formdata.append("artwork", song.artworkFile);
      }
    });

    // New songs artwork → newArtwork
    editSongs.forEach((song) => {
      if (song.isNew && song.artworkFile) {
        formdata.append("newArtwork", song.artworkFile);
      }
    });

    try {
      await axios.patch(`${baseUrl}/api/playlist/${playlistId}`, formdata, {
        headers,
      });
      setSuccess("Playlist updated successfully.");
      setIsEditing(false);
      setCoverFile(null);
      fetchPlaylist();
      onUpdated?.();
      setSaving(false);
    } catch (error) {
      setError(error?.response?.data?.message);
      setSaving(false);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
    setShowModal(false);
  };

  if (!showModal) return null;

  const inputClass =
    "w-full h-11 rounded-xl bg-gray-50 border border-gray-200 outline-none focus:border-purple-400 px-3 text-sm";

  return (
    <div
      className="w-screen h-screen z-[3000] fixed inset-0 px-4 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl relative flex flex-col overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 text-white drop-shadow"
        >
          <IoIosCloseCircle size={32} />
        </button>

        {loading ? (
          <div className="w-full h-80 flex items-center justify-center">
            <Loader />
          </div>
        ) : isEditing ? (
          <>
            <div className="relative w-full h-40 bg-purple-600 shrink-0 flex items-end p-4 sm:p-5">
              <div>
                <p className="text-white/80 text-xs font-medium mb-1">
                  Edit Playlist
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {playlist?.title}
                </h2>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Cover Photo
                </label>
                <div
                  className="w-full h-44 rounded-xl cursor-pointer bg-gray-50 border border-dashed border-gray-300 overflow-hidden relative group"
                  onClick={() =>
                    document.getElementById("edit-playlist-cover").click()
                  }
                >
                  <input
                    id="edit-playlist-cover"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                  {coverPreview ? (
                    <>
                      <img
                        src={coverPreview}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/45 flex flex-col items-center justify-center gap-1 text-white">
                        <CiImageOn className="text-3xl" />
                        <span className="text-sm font-semibold">
                          Change Cover
                        </span>
                        <span className="text-xs text-white/80">
                          Click to upload new image
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-gray-500">
                      <CiImageOn className="text-3xl" />
                      <span className="text-sm font-medium">
                        Upload cover photo
                      </span>
                      <span className="text-xs text-gray-400">
                        JPG or PNG format
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Playlist title"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClass} h-20 py-2 resize-none`}
                  placeholder="Description"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <FaApple className="text-pink-500" />
                    Apple Music URL
                  </label>
                  <input
                    type="text"
                    value={appleMusicUrl}
                    onChange={(e) => setAppleMusicUrl(e.target.value)}
                    className={inputClass}
                    placeholder="https://music.apple.com/..."
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <FaSpotify className="text-[#1DB954]" />
                    Spotify URL
                  </label>
                  <input
                    type="text"
                    value={spotifyUrl}
                    onChange={(e) => setSpotifyUrl(e.target.value)}
                    className={inputClass}
                    placeholder="https://open.spotify.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MdMusicNote className="text-purple-500" />
                  Songs ({editSongs.length})
                </h3>
                <button
                  type="button"
                  onClick={addNewSong}
                  className="h-8 px-3 rounded-full bg-purple-500 text-white text-xs font-medium flex items-center gap-1"
                >
                  <FiPlus size={14} />
                  Add Song
                </button>
              </div>

              {editSongs.map((song, index) => (
                <div
                  key={song._id || `new-${index}`}
                  className="border border-gray-100 rounded-xl p-3 flex flex-col gap-3 bg-gray-50/50"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-600 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-500 text-white text-[10px] flex items-center justify-center">
                        {index + 1}
                      </span>
                      {song.isNew ? "New Song" : "Existing Song"}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSong(index)}
                      className="text-red-500 text-xs font-medium flex items-center gap-0.5"
                    >
                      <MdClose size={14} />
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-[100px_1fr] gap-3">
                    <div
                      className={`h-24 sm:h-full min-h-[96px] rounded-xl cursor-pointer bg-white border border-dashed overflow-hidden flex items-center justify-center ${
                        song.error && song.isNew && !song.artworkFile
                          ? "border-red-400"
                          : "border-gray-300"
                      }`}
                      onClick={() =>
                        document
                          .getElementById(`edit-song-art-${index}`)
                          .click()
                      }
                    >
                      <input
                        id={`edit-song-art-${index}`}
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) => handleSongArtworkChange(index, e)}
                      />
                      {song.artworkPreview ? (
                        <img
                          src={song.artworkPreview}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-0.5 text-gray-400 px-1 text-center">
                          <CiImageOn className="text-2xl" />
                          <span className="text-[10px]">Artwork</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <input
                        type="text"
                        value={song.songName}
                        onChange={(e) =>
                          updateSongField(index, "songName", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Song name"
                      />
                      <input
                        type="text"
                        value={song.artistName}
                        onChange={(e) =>
                          updateSongField(index, "artistName", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Artist name"
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={song.appleMusicUrl}
                          onChange={(e) =>
                            updateSongField(
                              index,
                              "appleMusicUrl",
                              e.target.value
                            )
                          }
                          className={inputClass}
                          placeholder="Apple Music URL"
                        />
                        <input
                          type="text"
                          value={song.spotifyUrl}
                          onChange={(e) =>
                            updateSongField(index, "spotifyUrl", e.target.value)
                          }
                          className={inputClass}
                          placeholder="Spotify URL"
                        />
                      </div>
                    </div>
                  </div>
                  {song.error && (
                    <p className="text-red-600 text-xs font-medium">
                      {song.error}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="shrink-0 border-t border-gray-100 p-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 h-11 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 h-11 rounded-full bg-purple-500 text-white text-sm font-semibold"
              >
                {saving ? <BtnLoader /> : "Save Changes"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="relative w-full h-48 sm:h-56 bg-gray-100 shrink-0">
              <img
                src={playlist?.cover}
                alt={playlist?.title || "Playlist cover"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full flex items-center gap-1">
                    <MdMusicNote size={12} />
                    {playlist?.songCount ?? songs.length} songs
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold leading-tight">
                  {playlist?.title}
                </h2>
                <p className="text-sm text-white/80 mt-1 line-clamp-2">
                  {playlist?.description}
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                {playlist?.appleMusicUrl && (
                  <a
                    href={playlist.appleMusicUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-10 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-red-600 text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    <FaApple size={16} />
                    Apple Music
                  </a>
                )}
                {playlist?.spotifyUrl && (
                  <a
                    href={playlist.spotifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 h-10 rounded-full bg-[#1DB954] text-white text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition"
                  >
                    <FaSpotify size={16} />
                    Spotify
                  </a>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  <MdMusicNote className="text-purple-500" />
                  Songs
                </h3>

                {songs.length === 0 ? (
                  <p className="text-sm text-gray-500 py-6 text-center">
                    No songs in this playlist.
                  </p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {songs.map((song, index) => (
                      <div
                        key={song?._id || index}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 text-xs font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <img
                          src={song?.songArtwork}
                          alt={song?.songName}
                          className="w-12 h-12 rounded-lg object-cover shrink-0 bg-gray-100"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">
                            {song?.songName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {song?.artistName}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {song?.appleMusicUrl && (
                            <a
                              href={song.appleMusicUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-red-600 text-white flex items-center justify-center hover:opacity-90"
                              title="Apple Music"
                            >
                              <FaApple size={13} />
                            </a>
                          )}
                          {song?.spotifyUrl && (
                            <a
                              href={song.spotifyUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="w-8 h-8 rounded-full bg-[#1DB954] text-white flex items-center justify-center hover:opacity-90"
                              title="Spotify"
                            >
                              <FaSpotify size={13} />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-gray-100 p-4">
              <button
                type="button"
                onClick={startEditing}
                className="w-full h-11 rounded-full bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold flex items-center justify-center gap-2 transition"
              >
                <MdEdit size={18} />
                Edit Playlist
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BrittanyPlaylistViewModal;

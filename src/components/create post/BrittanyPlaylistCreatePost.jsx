import React, { useContext, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { LiaFileAudio } from "react-icons/lia";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import { brittanytalks } from "../../data/create/brittanytalks";
import { brittanytalkscreate } from "../../schemas/create/BrittanyTalks";
import BtnLoader from "../global/BtnLoader";
import { brittanyplaylist } from "../../data/create/brittanyplaylist";
import { brittanyplaylistcreate } from "../../schemas/create/BrittanyPlaylist";

const BrittanyPlaylistCreatePost = ({ id }) => {
  const [images, setImages] = useState(null);
  const [imageBase, setImageBase] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [audio, setAudio] = useState(null);
  const [audioBase, setAudioBase] = useState(null);
  const [audioError, setAudioError] = useState(false);
  const [audioDuration, setAudioDuration] = useState(null);

  const { baseUrl, setError, setSuccess } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  // const formatDuration = (durationInSeconds) => {
  //   const minutes = Math.floor(durationInSeconds / 60);
  //   const seconds = Math.floor(durationInSeconds % 60);
  //   return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
  //     2,
  //     "0"
  //   )} mins`;
  // };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase(reader.result);
      };
      reader.readAsDataURL(file);
      setImageError(false);
      setImages(file);
    }
  };

  // const handleAudioChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setAudioBase(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //     setAudioError(false);
  //     setAudio(file);

  //     // Create an audio element to calculate duration
  //     const audioElement = document.createElement("audio");
  //     audioElement.src = URL.createObjectURL(file);
  //     audioElement.onloadedmetadata = () => {
  //       const durationInSeconds = audioElement.duration;
  //       setAudioDuration(formatDuration(durationInSeconds)); // Set the formatted audio duration
  //     };
  //   }
  // };

  const handleRemoveImage = () => {
    setImages(null);
    setImageBase(null);
  };

  // const handleRemoveAudio = () => {
  //   setAudio(null);
  //   setAudioBase(null);
  //   setAudioDuration(null); // Reset audio duration
  // };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: brittanyplaylist,
      validationSchema: brittanyplaylistcreate,
      onSubmit: async (values) => {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${Cookies.get("token")}`,
        };
        const formdata = new FormData();

        formdata.append("url", values.url?.trim());
        formdata.append("categoryId", id);
        formdata.append("cover", images);
        try {
          await axios.post(`${baseUrl}/api/brittanyPlaylist`, formdata, {
            headers,
          });
          setSuccess("Playlist Updated Successfully.");
          values.url = "";
          setImageBase(null);
          setImages(null);
          setLoading(false);
        } catch (error) {
          setError(error?.response?.data?.message);
          setLoading(false);
        }
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col justify-start items-start gap-4 "
    >
      <div className="w-full h-32 rounded-2xl flex justify-center items-center text-3xl font-bold bg text-white">
        Brittany's Playlist
      </div>

      <div className="w-full flex flex-col rounded-2xl gap-2 justify-start items-start">
        <div
          className={`w-full h-40 rounded-2xl cursor-pointer bg-gray-50 flex flex-col gap-1 justify-center items-center ${
            imageError ? "border border-red-500" : ""
          }`}
          onClick={() =>
            document.getElementById("attraction-image-add").click()
          }
        >
          <input
            id="attraction-image-add"
            className="w-full hidden h-24 rounded-full text-sm outline-none border-none px-4"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
          {imageBase ? (
            <img
              src={imageBase}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <CiImageOn className="text-3xl text-gray-600 font-medium" />
              <span className="text-md font-bold text-gray-600">
                Playlist Cover Photo
              </span>
              <span className="text-xs font-medium text-gray-600">
                Please provide the image in jpg or png format.
              </span>
            </div>
          )}
        </div>
        {imageError && (
          <p className="text-red-700 text-sm font-medium">{imageError}</p>
        )}
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label htmlFor="url" className="text-sm ml-1 text-gray-800 font-medium">
          Playlist URL
        </label>
        <input
          type="text"
          name="url"
          id="url"
          value={values.url}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. https://youtube.com/"
          className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 ${
            errors.url && touched.url ? "border-red-600 shake" : ""
          } px-4`}
        />
        {errors.url && touched.url && (
          <p className="text-red-700 text-sm font-medium">{errors.url}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 text-white text-[16px] font-bold"
      >
        {loading ? <BtnLoader /> : "Update Playlist"}
      </button>
    </form>
  );
};

export default BrittanyPlaylistCreatePost;

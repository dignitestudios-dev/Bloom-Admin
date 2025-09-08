import React, { useContext, useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { PiVideoLight } from "react-icons/pi";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import { brittanytalks } from "../../data/create/brittanytalks";
import { brittanytalkscreate } from "../../schemas/create/BrittanyTalks";
import BtnLoader from "../global/BtnLoader";
import { ErrorToast } from "../global/Toaster";

const BrittanyTalksCreatePost = ({ id }) => {
  const [images, setImages] = useState(null);
  const [imageBase, setImageBase] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [video, setVideo] = useState(null);

  const [videoBase, setVideoBase] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [videoDuration, setVideoDuration] = useState(null);

  const { baseUrl, navigate, setError, setSuccess } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const formatDuration = (durationInSeconds) => {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    const seconds = Math.floor(durationInSeconds % 60);

    if (hours > 0) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )} hours`;
    }
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )} mins`;
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
      setImages(file);
    }
  };
  
  const handleVideoChange = (e) => {
   
    const file = e.target.files[0];
    if (file) {
      const maxSizeInMB = 3072; // 3 GB
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      
      if (file.size > maxSizeInBytes) {
        ErrorToast("File size should be less than 3GB");
        setVideoError("File size should be less than 3GB");
        setVideo(null);
        setVideoBase(null);
        setVideoDuration(null);
        return;
      }
      
      // ❌ FileReader ki jagah ye use karo
      const videoURL = URL.createObjectURL(file);
      setVideoBase(videoURL); // ab ye preview me direct chalega
      setVideo(file);
      setVideoError(false);
      
      // Duration nikalne ke liye
      const videoElement = document.createElement("video");
      videoElement.src = videoURL;
      videoElement.onloadedmetadata = () => {
        const durationInSeconds = videoElement.duration;
        setVideoDuration(formatDuration(durationInSeconds));
      };
    }
  };
  

  const handleRemoveImage = () => {
    setImages(null);
    setImageBase(null);
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    setVideoBase(null);
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: brittanytalks,
      validationSchema: brittanytalkscreate,
      onSubmit: async (values) => {
        if (!images) {
          setImageError("Image is required.");
        }
        if (!video) {
          setVideoError("Video is required.");
        }
        if (images && video) {
          setLoading(true);
          const headers = {
            Authorization: `Bearer ${Cookies.get("token")}`,
          };

          const formdata = new FormData();
          formdata.append("title", values.title?.trim());
          formdata.append("description", values.description?.trim());
          formdata.append("content", video);
          formdata.append("videoCover", images);
          formdata.append("categoryId", id);
          formdata.append("duration", videoDuration);

          for (let [key, value] of formdata.entries()) {
            console.log(key, value);
          }
          try {
            const response = await axios.post(
              `${baseUrl}/api/brittanyTalk`,
              formdata,
              { headers }
            );
            console.log("this is values --- > ",formdata); 
            console.log("this is response --- > ",response);
            setSuccess("Post Created Successfully.");
            values.title = "";
            values.description = "";
            setImageBase(null);
            setImages(null);
            setVideoBase(null);
            setVideo(null);
            setLoading(false);
          } catch (error) {
            setError(error?.response?.data?.message);
            setLoading(false);
          }
        }
      },
    });
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col justify-start items-start gap-4"
    >
      <div className="w-full h-32 rounded-2xl flex justify-center items-center text-3xl font-bold bg text-white">
        Brittany Talks
      </div>
      <div className="w-full flex flex-col border rounded-2xl gap-2 justify-start items-start">
        <div className="w-full grid grid-cols-2 justify-start p-1 items-start gap-2">
          <div
            onClick={() =>
              document.getElementById("attraction-video-add").click()
            }
            className="w-full h-40 rounded-2xl cursor-pointer bg-gray-50  flex flex-col gap-1 justify-center items-center"
          >
            <input
              id="attraction-video-add"
              className="w-full hidden h-24 rounded-full text-sm outline-none border-none px-4"
              type="file"
              accept="video/mp4"
              onChange={handleVideoChange}
            />
            <div className="w-full h-full rounded-xl flex flex-col justify-center items-center relative">
              {videoBase ? (
                <>
                <video controls className="w-full h-full object-contain  rounded-[20px]">
                  <source src={videoBase} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                  {/* <MdClose size={18} color="white"
                onClick={handleRemoveVideo}
                  className="absolute top-2 right-0 cursor-pointer z-50 bg-red-500 rounded-full p-1"
                /> */}
                </>
              ) : (
                <>
                  <PiVideoLight className="text-3xl text-gray-600 font-medium" />
                  <span className="text-md font-bold text-gray-600">Video</span>
                  <span className="text-xs font-medium text-gray-600">
                    Providing video in Mp4 format is preferred
                  </span>
                </>
              )}
            </div>
            {videoError && (
              <p className="text-red-700 mb-1 text-sm font-medium">
                {videoError}
              
              </p>
            )}
          </div>
          <div className="w-full flex flex-col  rounded-2xl gap-2 justify-start items-start">
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
                    Video Cover Photo
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    Please provide the Image in jpg or png format.
                  </span>
                </div>
              )}
            </div>
            {imageError && (
              <p className="text-red-700 text-sm font-medium">{imageError}</p>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="title"
          className="text-sm ml-1 text-gray-800 font-medium"
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
          placeholder="e.g. Title of the post."
          className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 ${
            errors.title && touched.title ? "border-red-600 shake" : ""
          } px-4`}
        />
        {errors.title && touched.title && (
          <p className="text-red-700 text-sm font-medium">{errors.title}</p>
        )}
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="description"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          Description
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Description of the post."
          className={`w-full h-48 resize-none rounded-2xl bg-gray-50 border outline-none ${
            errors.description && touched.description
              ? "border-red-600 shake"
              : ""
          } focus-within:border-gray-400 p-4`}
        ></textarea>
        {errors.description && touched.description && (
          <p className="text-red-700 text-sm font-medium">
            {errors.description}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 text-white text-[16px] font-bold "
      >
        {loading ? <BtnLoader /> : "Add Video"}
      </button>
    </form>
  );
};

export default BrittanyTalksCreatePost;

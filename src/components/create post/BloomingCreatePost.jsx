import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import BtnLoader from "../global/BtnLoader";
import Error from "../global/Error";
import { dailydevo } from "../../data/create/dailydevo";
import { dailydevocreate } from "../../schemas/create/DailyDevo";
import { AppContext } from "../../context/AppContext";
import { blooming } from "../../data/create/bloooming";
import { bloomingcreate } from "../../schemas/create/Blooming";

const BloomingCreatePost = ({ id }) => {
  const [images, setImages] = useState(null);
  const [imageBase, setImageBase] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleImage = (e) => {
    const elem = document.getElementById("attraction-image-add");
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
      setImages(file);
    }
  };

  const handleRemoveImage = () => {
    let updatedImages = images;
    updatedImages = null;
    setImages(updatedImages);
  };

  const { baseUrl, navigate, setError, error, success, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: blooming,
      validationSchema: bloomingcreate,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        if (images == null) {
          setImageError("Image is required.");
        } else {
          setLoading(true);
          const headers = {
            Authorization: `Bearer ${Cookies.get("token")}`,
          };

          const formdata = new FormData();
          formdata.append("title", values?.title?.trim());
          formdata.append("image", images);
          formdata.append("categoryId", id);

          axios.post(`${baseUrl}/api/blooming`, formdata, { headers }).then(
            (response) => {
              setSuccess("Post Created Successfully.");
              values.title = "";
              setImageBase(null);
              setImages(null);
              setLoading(false);
            },
            (error) => {
              setError(error?.response?.data?.message);
              setLoading(false);

              // setFormError(error?.response?.data?.message);
            }
          );
        }
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col justify-start items-start gap-4 "
    >
      <div className="w-full h-32 rounded-2xl flex justify-center items-center text-3xl font-bold bg text-white">
        Blooming
      </div>
      <div className="w-full flex flex-col  border    rounded-2xl gap-2 justify-start items-start">
        <div
          onClick={handleImage}
          className={`w-full h-40 rounded-2xl cursor-pointer bg-gray-50 flex flex-col gap-1 justify-center items-center ${
            imageError ? "border border-red-500" : null
          }`}
        >
          <input
            id="attraction-image-add"
            className="w-full hidden h-24 rounded-full text-sm  outline-none border-none px-4"
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleImageChange(e)}
          />

          {imageBase ? (
            <img
              src={imageBase}
              alt=""
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
              <CiImageOn className="text-3xl text-gray-600 font-medium" />
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
            errors.title && touched.title ? "border-red-600 shake" : null
          } px-4`}
        />

        {errors.title && touched.title ? (
          <p className="text-red-700 text-sm font-medium">{errors.title}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 text-white text-[16px] font-bold "
      >
        {loading ? <BtnLoader /> : "Create Post"}
      </button>
    </form>
  );
};

export default BloomingCreatePost;

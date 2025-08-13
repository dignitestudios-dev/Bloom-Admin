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
import { heyyou } from "../../data/create/heyyou";
import { heyyoucreate } from "../../schemas/create/HeyYou";

const HeyYouCreatePost = ({ id }) => {
  const [images, setImages] = useState(null);
  const [imageBase, setImageBase] = useState(null);
  const [imageError, setImageError] = useState(false);

  const handleImage = (e) => {
    const elem = document.getElementById("attraction-image-add");
    elem.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const maxSize = 3 * 1024 * 1024 * 1024; // 2 MB in bytes

    if (file) {
      if (file.size > maxSize) {
        setImageError("Max image size is 3 GB");
        setImageBase(null); // Clear any existing image base
        setImages(null); // Clear any existing image file
        return; // Exit function
      }

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

  const [update, setUpdate] = useState(false);

  const { baseUrl, navigate, setError, error, success, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: heyyou,
      validationSchema: heyyoucreate,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        if (images == null && imageBase == null) {
          setImageError("Image is required.");
        } else {
          setLoading(true);
          const headers = {
            Authorization: `Bearer ${Cookies.get("token")}`,
          };

          const formdata = new FormData();
          formdata.append("quote", values?.quote?.trim());
          formdata.append("about", values?.about?.trim());
          formdata.append("imagecontent", values?.imagecontent?.trim());
          images && formdata.append("image", images);

          axios
            .put(`${baseUrl}/admin/updatedHeyYou/${data?._id}`, formdata, {
              headers,
            })
            .then(
              (response) => {
                setSuccess("Hey You Updated Successfully.");
                setUpdate((prev) => !prev);
                setImages(null);
                setLoading(false);
              },
              (error) => {
                setError(error?.response?.data?.message);
                setLoading(false);
              }
            );
        }
      },
    });

  const [data, setData] = useState(null);
  const [dataLoading, setDataLoading] = useState(false);

  const getHeyYou = () => {
    setDataLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/admin/HeyYou`, { headers })
      .then((response) => {
        const data = response?.data?.data;
        setData(data);
        values.imagecontent = data?.imagecontent;
        values.about = data?.about;
        values.quote = data?.quote;
        setImageBase(data?.image);
        setDataLoading(false);
      })
      .catch((error) => {
        setDataLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getHeyYou();
  }, [update]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col justify-start items-start gap-4 "
    >
      <div className="w-full h-32 rounded-2xl flex justify-center items-center text-3xl font-bold bg text-white">
        Hey You
      </div>
      <div className="w-full flex flex-col      rounded-2xl gap-2 justify-start items-start">
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
                Please provide the Image in png format. Max Image size is 2 MB
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
          htmlFor="imagecontent"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          Image Text
        </label>
        <input
          type="text"
          name="imagecontent"
          id="imagecontent"
          value={values.imagecontent}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 ${
            errors.imagecontent && touched.imagecontent
              ? "border-red-600 shake"
              : null
          } px-4`}
        />

        {errors.imagecontent && touched.imagecontent ? (
          <p className="text-red-700 text-sm font-medium">
            {errors.imagecontent}
          </p>
        ) : null}
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="quote"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          Quote
        </label>
        <input
          type="text"
          name="quote"
          id="quote"
          value={values.quote}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 ${
            errors.quote && touched.quote ? "border-red-600 shake" : null
          } px-4`}
        />

        {errors.quote && touched.quote ? (
          <p className="text-red-700 text-sm font-medium">{errors.quote}</p>
        ) : null}
      </div>

      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="description"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          About
        </label>
        <textarea
          type="text"
          name="about"
          id="about"
          value={values.about}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`w-full h-48 resize-none rounded-2xl bg-gray-50 border outline-none ${
            errors.about && touched.about ? "border-red-600 shake" : null
          } focus-within:border-gray-400 p-4`}
        ></textarea>

        {errors.about && touched.about ? (
          <p className="text-red-700 text-sm font-medium">{errors.about}</p>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 text-white text-[16px] font-bold "
      >
        {loading ? <BtnLoader /> : "Update"}
      </button>
    </form>
  );
};

export default HeyYouCreatePost;

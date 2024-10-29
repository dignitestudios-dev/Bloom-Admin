import React from "react";
import { LuImagePlus } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";
import { useRef } from "react";
import { PiCurrencyDollarBold, PiVideoLight } from "react-icons/pi";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import BtnLoader from "../global/BtnLoader";
import Error from "../global/Error";
import { bookscreate } from "../../schemas/create/Books";
import { books } from "../../data/create/books";
import { AppContext } from "../../context/AppContext";

const BooksOfMonthCreatePost = ({ id }) => {
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
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const targetWidth = 425;
          const targetHeight = 1200;

          // Set canvas dimensions
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // Check if the image is smaller than 450x500 pixels
          if (img.width < 450 || img.height < 700) {
            setImageError(
              "Image must be atleast 450px in width and 700px in height."
            );
            setImages(null);
            setImageBase(null);
            return;
          }

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          canvas.toBlob((blob) => {
            if (blob) {
              setImageError(false);
              setImages(blob);
            }
          });

          const resizedImageDataUrl = canvas.toDataURL("image/jpeg", 1.0);
          setImageBase(resizedImageDataUrl);
        };
      };
      reader.readAsDataURL(file);
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
      initialValues: books,
      validationSchema: bookscreate,
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
          formdata.append("description", values?.description?.trim());
          formdata.append("author", values?.author?.trim());
          formdata.append("price", parseInt(values?.price));
          formdata.append("image", images);
          formdata.append("categoryId", id);

          axios.post(`${baseUrl}/api/book`, formdata, { headers }).then(
            (response) => {
              setSuccess("Post Created Successfully.");
              values.title = "";
              values.description = "";
              values.price = "";
              values.author = "";
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
        Books of the month
      </div>
      <div className="w-full flex flex-col      rounded-2xl gap-2 justify-start items-start">
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
      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="title"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          Book Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Psychology of Money."
          className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 ${
            errors.title && touched.title ? "border-red-600 shake" : null
          } px-4`}
        />

        {errors.title && touched.title ? (
          <p className="text-red-700 text-sm font-medium">{errors.title}</p>
        ) : null}
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="author"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          Book Author
        </label>
        <input
          type="text"
          name="author"
          id="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="e.g. Jane Doe"
          className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 ${
            errors.author && touched.author ? "border-red-600 shake" : null
          } px-4`}
        />

        {errors.author && touched.author ? (
          <p className="text-red-700 text-sm font-medium">{errors.author}</p>
        ) : null}
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-[2px]">
        <label
          htmlFor="Price"
          className="text-sm ml-1 text-gray-800 font-medium"
        >
          Price
        </label>
        <div className="w-full flex justify-start items-center h-auto">
          <span className="w-[5%] h-12 rounded-l-2xl  flex items-center justify-center bg-gray-50 border outline-none focus-within:border-gray-400 text-gray-400">
            <PiCurrencyDollarBold />
          </span>
          <input
            type="number"
            name="price"
            id="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. 240."
            className={`w-[95%] h-12 rounded-r-2xl  bg-gray-50 border outline-none focus-within:border-gray-400 px-4 ${
              errors.price && touched.price ? "border-red-600 shake" : null
            }`}
          />
        </div>
        {errors.price && touched.price ? (
          <p className="text-red-700 text-sm font-medium">{errors.price}</p>
        ) : null}
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
              : null
          } focus-within:border-gray-400 p-4`}
        ></textarea>

        {errors.description && touched.description ? (
          <p className="text-red-700 text-sm font-medium">
            {errors.description}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 text-white text-[16px] font-bold "
      >
        {loading ? <BtnLoader /> : "Add Book"}
      </button>
    </form>
  );
};

export default BooksOfMonthCreatePost;

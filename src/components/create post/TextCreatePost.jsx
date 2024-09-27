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

const TextCreatePost = ({ id }) => {
  const { baseUrl, navigate, setError, error, success, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: dailydevo,
      validationSchema: dailydevocreate,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        setLoading(true);
        const headers = {
          Authorization: `Bearer ${Cookies.get("token")}`,
        };

        axios
          .post(
            `${baseUrl}/api/textPost`,
            {
              title: values?.title?.trim(),
              description: values?.description?.trim(),
              categoryId: id,
            },
            { headers }
          )
          .then(
            (response) => {
              setSuccess("Post Created Successfully.");
              values.title = "";
              values.description = "";

              setLoading(false);
            },
            (error) => {
              setError(error?.response?.data?.message);
              setLoading(false);

              // setFormError(error?.response?.data?.message);
            }
          );
      },
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-auto flex flex-col justify-start items-start gap-4 "
    >
      <div className="w-full h-32 rounded-2xl flex justify-center items-center text-3xl font-bold bg text-white">
        Text Post
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
        {loading ? <BtnLoader /> : "Create Post"}
      </button>
    </form>
  );
};

export default TextCreatePost;

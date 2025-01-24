import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { notification } from "../../data/create/notification";
import { notificationcreate } from "../../schemas/create/Notification";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import BtnLoader from "../global/BtnLoader";

const NotificationCreateModal = ({ isOpen, setIsOpen, setReload }) => {
  const modalRef = useRef();
  const toggleModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const { baseUrl, navigate, setError, error, success, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: notification,
      validationSchema: notificationcreate,
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
            `${baseUrl}/api/2/notifications/admin`,
            {
              title: values.title,
              message: values.message,
            },
            { headers }
          )
          .then(
            (response) => {
              setSuccess("Notification Created Successfully.");
              setLoading(false);
              setIsOpen(false);
              setReload((prev) => !prev);
              action.resetForm();
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
    <div
      onClick={toggleModal}
      className={`w-screen h-screen   z-50 transition-all duration-500 flex justify-end items-end pr-7  fixed bottom-[4.5rem] left-0 ${
        isOpen ? "translate-x-0" : "translate-x-[250vh]"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        ref={modalRef}
        className="bg-purple-400 w-72 h-80 p-4 flex flex-col gap-2 justify-start items-start rounded-2xl shadow-xl border"
      >
        <div className="w-full flex flex-col justify-start items-start">
          <label
            htmlFor="title"
            className="block ml-1 text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. New Feature Update"
            className={`mt-1 px-3 h-12 placeholder:text-sm w-full border rounded-lg bg-white focus:border-gray-200 focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration ${
              errors.title && touched.title ? "border-red-600 shake" : null
            }`}
          />
          {errors.title && touched.title ? (
            <p className="text-red-700 text-sm font-medium">{errors.title}</p>
          ) : null}
        </div>
        <div className="w-full flex flex-col justify-start items-start">
          <label
            htmlFor="message"
            className="block ml-1 text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            type="text"
            id="message"
            name="message"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="e.g. Our app is getting a new feature"
            className={`mt-1 p-3 h-32 resize-none bg-white w-full placeholder:text-sm border rounded-lg focus:border-gray-200 focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duration ${
              errors.message && touched.message ? "border-red-600 shake" : null
            }`}
          ></textarea>
          {errors.message && touched.message ? (
            <p className="text-red-700 text-sm font-medium">{errors.message}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full h-10 rounded-full flex items-center justify-center text-md font-medium text-white bg"
        >
          {loading ? <BtnLoader /> : "Send"}
        </button>
      </form>
    </div>
  );
};

export default NotificationCreateModal;

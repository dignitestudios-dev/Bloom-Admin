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
import { AppContext } from "../../context/AppContext";
import { enrichment } from "../../data/create/enrichment";
import { enrichmentcreate } from "../../schemas/create/Enrichment";
import { event } from "../../data/create/event";
import { eventscreate } from "../../schemas/create/EventCreate";

const EventsCreatePost = ({ id }) => {
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

  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [dateTime, setDateTime] = useState("");

  const handleDateTimeChange = (e) => {
    const dateTimeValue = e.target.value; // e.g., "2025-06-04T21:58"
    setDateTime(dateTimeValue);
    const [datePart, timePart] = dateTimeValue.split("T");

    // Convert date to "DD-MM-YYYY"
    const [year, month, day] = datePart.split("-");
    const formattedDate = `${String(month).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}-${year}`;

    // Convert time to "HH:MM AM/PM"
    const [hour, minute] = timePart.split(":");
    const formattedHour = hour % 12 || 12; // Convert to 12-hour format
    const period = hour >= 12 ? "PM" : "AM";
    const formattedTime = `${String(formattedHour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")} ${period}`;

    // Update states
    setEventDate(formattedDate);
    setEventTime(formattedTime);
    setDateError(false);
  };

  const [dateError, setDateError] = useState(false);

  const { baseUrl, navigate, setError, error, success, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: event,
      validationSchema: eventscreate,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        if (images == null) {
          setImageError("Image is required.");
        } else if (eventDate == "" || eventTime == "") {
          setDateError("Event's Date & Time is required.");
        } else {
          setLoading(true);
          const headers = {
            Authorization: `Bearer ${Cookies.get("token")}`,
          };

          const formdata = new FormData();
          formdata.append("title", values?.title);
          formdata.append("description", values?.description);
          formdata.append("streetAddress", values?.streetAddress);
          formdata.append("city", values?.city);
          formdata.append("state", values?.state);
          formdata.append("eventDate", eventDate);
          formdata.append("eventTime", eventTime);
          formdata.append("image", images);
          formdata.append("categoryId", id);

          axios.post(`${baseUrl}/api/events`, formdata, { headers }).then(
            (response) => {
              setSuccess("Event Created Successfully.");
              action.resetForm();
              setImageBase(null);
              setImages(null);
              setEventDate("");
              setEventTime("");
              setDateTime("");
              setDateError(false);
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
        Events
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
            className="w-full  hidden h-24 rounded-full text-sm  outline-none border-none px-4"
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
            <div className="w-full h-full flex flex-col justify-center items-center">
              <CiImageOn className="text-3xl text-gray-600 font-medium" />
              <span className="text-md font-bold text-gray-600">
                Event Cover Photo
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
          placeholder="e.g. Title of the event."
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
          placeholder="e.g. Description of the event."
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

      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="w-full col-span-2 h-auto flex flex-col justify-start items-start gap-[2px]">
          <label
            htmlFor="streetAddress"
            className="text-sm ml-1 text-gray-800 font-medium"
          >
            Street Address
          </label>
          <input
            type="text"
            name="streetAddress"
            value={values.streetAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            id="streetAddress"
            placeholder="3505 Lake Lynda Dr."
            className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 px-4 ${
              errors.streetAddress && touched.streetAddress
                ? "border-red-600 shake"
                : null
            }`}
          />

          {errors.streetAddress && touched.streetAddress ? (
            <p className="text-red-700 text-sm font-medium">
              {errors.streetAddress}
            </p>
          ) : null}
        </div>
        <div className="w-full col-span-1 h-auto flex flex-col justify-start items-start gap-[2px]">
          <label
            htmlFor="city"
            className="text-sm ml-1 text-gray-800 font-medium"
          >
            City
          </label>
          <input
            type="text"
            name="city"
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            id="city"
            placeholder="Orlando"
            className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 px-4 ${
              errors.city && touched.city ? "border-red-600 shake" : null
            }`}
          />
          {errors.city && touched.city ? (
            <p className="text-red-700 text-sm font-medium">{errors.city}</p>
          ) : null}
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="w-full col-span-1 h-auto flex flex-col justify-start items-start gap-[2px]">
          <label
            htmlFor="state"
            className="text-sm ml-1 text-gray-800 font-medium"
          >
            State
          </label>
          <input
            type="text"
            name="state"
            value={values.state}
            onChange={handleChange}
            onBlur={handleBlur}
            id="state"
            placeholder="Florida"
            className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 px-4 ${
              errors.state && touched.state ? "border-red-600 shake" : null
            }`}
          />
          {errors.state && touched.state ? (
            <p className="text-red-700 text-sm font-medium">{errors.state}</p>
          ) : null}
        </div>
        <div className="w-full col-span-1 h-auto flex flex-col justify-start items-start gap-[2px]">
          <label
            htmlFor="event-date"
            className="text-sm ml-1 text-gray-800 font-medium"
          >
            Event Date
          </label>
          <input
            type="datetime-local"
            name="event-date"
            value={dateTime}
            onChange={handleDateTimeChange}
            id="event-date"
            className={`w-full h-12 rounded-2xl bg-gray-50 border outline-none focus-within:border-gray-400 px-4 ${
              dateError && "border-red-600 shake"
            }`}
          />
          {dateError && (
            <p className="text-red-700 text-sm font-medium">{dateError}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full h-12 rounded-full bg-purple-500 text-white text-[16px] font-bold "
      >
        {loading ? <BtnLoader /> : "Create Event"}
      </button>
    </form>
  );
};

export default EventsCreatePost;

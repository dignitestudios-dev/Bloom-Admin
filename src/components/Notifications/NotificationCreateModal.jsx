import React, { useRef } from "react";

const NotificationCreateModal = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef();
  const toggleModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  return (
    <div
      onClick={toggleModal}
      className={`w-screen h-screen   z-50 transition-all duration-500 flex justify-end items-end pr-7  fixed bottom-[4.5rem] left-0 ${
        isOpen ? "translate-x-0" : "translate-x-[250vh]"
      }`}
    >
      <div
        ref={modalRef}
        className="bg-white w-72 h-80 p-4 flex flex-col gap-2 justify-start items-start rounded-2xl shadow-xl border"
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
            placeholder="e.g. New Feature Update"
            className={`mt-1 px-3 h-12 placeholder:text-sm w-full border rounded-md bg-white focus:border-gray-200 focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duratio`}
          />
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
            placeholder="e.g. Our app is getting a new feature"
            className={`mt-1 p-3 h-32 resize-none bg-white w-full placeholder:text-sm border rounded-md focus:border-gray-200 focus:outline-none  focus:ring-offset-2 focus:ring-gray-300 transition-colors duratio`}
          ></textarea>
        </div>
        <button className="w-full h-10 rounded-full flex items-center justify-center text-md font-medium text-white bg">
          Send
        </button>
      </div>
    </div>
  );
};

export default NotificationCreateModal;

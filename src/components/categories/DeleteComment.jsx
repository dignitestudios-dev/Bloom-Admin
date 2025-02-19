import React from "react";
import { IoIosCloseCircle } from "react-icons/io";

const DeleteComment = ({
  showModal,
  setShowModal,
  commentId,
  setHitApi,
  loading,
}) => {
  return showModal ? (
    <div className="w-screen h-screen z-[3000] fixed top-0 bottom-0 right-0 left-0 px-4 flex items-center justify-center bg-[rgba(0,0,0,0.01)] ">
      <div className="w-full lg:w-[430px] p-4 lg:px-6 lg:py-7 h-auto bg-white rounded-lg relative flex flex-col justify-between">
        <div className="w-full flex justify-between items-start">
          <div className="flex-col justify-center   text-center">
            <h1 className="font-semibold text-xl">
              Are you sure you want to delete this comment?
            </h1>
            <p className="pt-2 text-sm text-gray-600">
              This will remove this comment permanently from the database.
            </p>
            <div className="w-auto flex mt-2 justify-center items-center gap-1">
              <button
                className="bg-gray-200 text-black px-4 py-2 mx-1 rounded-full text-sm font-medium mt-2 "
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="bg-purple-600 text-white  px-4 py-2 mx-1 rounded-full text-sm font-medium mt-2 hover:bg-red-500"
                onClick={() => setHitApi((prev) => !prev)}
              >
                {loading ? "Deleting" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteComment;

import React from "react";
import { RxCaretDown } from "react-icons/rx";
import { IoMenuOutline } from "react-icons/io5";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="w-full h-14 border-b flex justify-between lg:justify-end items-center px-4">
      <button className="text-2xl block lg:hidden">
        <IoMenuOutline />
      </button>
      <div className="w-auto flex gap-3 justify-start items-center">
        <button
          onClick={() => {
            navigate("Dashboard", "/create-post");
          }}
          className="active:scale-95 w-28 rounded-full bg-purple-500/10 border border-purple-500 text-purple-500  h-10 font-medium  outline-none   hover:opacity-90"
        >
          Create Post
        </button>
        <img
          src={Cookies.get("profilePicture")}
          alt="user"
          className="w-9 h-9 rounded-full"
        />
        <div className="w-auto h-auto flex flex-col justify-start items-start">
          <h3 className="text-md leading-tight font-semibold text-[#191919]">
            {Cookies.get("name")}
          </h3>
          <h3 className="text-xs font-medium text-[#191919]">
            {Cookies.get("email")}
          </h3>
        </div>
        <button className="w-6 h-6 text-gray-400 rounded-full flex items-center justify-center border">
          <RxCaretDown />
        </button>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const SidebarLink = ({ data }) => {
  const { navigate, activeLink,countuser } = useContext(AppContext);
  return (
    <button
      onClick={() => navigate(data?.title, data?.url)}
      className={`w-full rounded-r-full h-12 transition-all duration-300 flex justify-start items-center gap-2 px-4 ${
        activeLink === data?.title
          ? "bg text-[#fff]"
          : "bg-purple-500/10 text-[#191919]"
      }  font-medium text-xl`}
    >
      <span>{data?.icon}</span>
      <span className="text-sm ">{data?.title}</span>
      <div className="flex justify-end items-center w-full">
      {data?.title === "Chats" && countuser > 0 && (
        <span className="text-sm bg-red-700 text-white rounded-full px-2 py-1   ">{countuser}</span>
      )}
      </div>
    </button>
  );
};

export default SidebarLink;

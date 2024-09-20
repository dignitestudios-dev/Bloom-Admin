import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { AppContext } from "../../context/AppContext";

const SidebarLink = ({ data }) => {
  const { navigate, activeLink } = useContext(AppContext);
  return (
    <button
      onClick={() => navigate(data?.title, data?.url)}
      className={`w-full rounded-r-full h-12 transition-all duration-300 flex justify-start items-center gap-2 px-4 ${
        activeLink === data?.title
          ? "bg text-[#fff]"
          : "bg-gray-50 text-[#191919]"
      }  font-medium text-xl`}
    >
      <span>{data?.icon}</span>
      <span className="text-sm ">{data?.title}</span>
    </button>
  );
};

export default SidebarLink;

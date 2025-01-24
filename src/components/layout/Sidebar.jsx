import React, { useContext } from "react";
import { Logo } from "../../assets/export";
import SidebarLink from "./SidebarLink";
import { sidebar } from "../../constants/sidebarData";
import { CiLogout } from "react-icons/ci";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";

const Sidebar = () => {
  const { navigate } = useContext(AppContext);
  return (
    <div className="w-[270px] h-full border-r rounded-r-3xl pr-2 overflow-y-auto flex flex-col items-center justify-start">
      <img src={Logo} alt="logo" className="w-[40%]" />
      <div className="w-full h-auto flex flex-col justify-start items-start gap-2">
        {sidebar?.map((data) => {
          return <SidebarLink data={data} key={data?.title} />;
        })}
        <button
          onClick={() => {
            Cookies.remove("token");
            navigate("Login", "/login");
          }}
          className={`w-full rounded-r-full h-12 transition-all duration-300 flex justify-start items-center gap-2 px-4 bg-purple-500/10 text-[#191919] hover:bg-purple-500 hover:text-white font-medium text-xl`}
        >
          <span>
            <CiLogout />
          </span>
          <span className="text-sm ">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

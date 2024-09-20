import React from "react";
import { UserStatsIcon } from "../../assets/export";
import { HiArrowTrendingUp } from "react-icons/hi2";
const UsersStats = () => {
  return (
    <div className="w-full h-[141px] rounded-2xl relative p-4 flex flex-col justify-start items-start bg-white shadow ">
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-auto h-auto flex flex-col gap-2 justify-start  items-start">
          <p className="text-[#5b5b5b] text-sm font-medium">Total User</p>
          <h1 className="text-3xl font-bold">40,689</h1>
        </div>
        <img src={UserStatsIcon} alt="user_stats" />
      </div>

      <div className="w-auto absolute bottom-3 text-[#00B69B] text-[14px] font-medium flex gap-1 justify-start items-center">
        <HiArrowTrendingUp className="text-[16px]" />
        <span>8.5% </span>
        <span className="text-[#5b5b5b]">Up from yesterday</span>
      </div>
    </div>
  );
};

export default UsersStats;

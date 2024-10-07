import React from "react";
import { UserStatsIcon } from "../../assets/export";
import { HiArrowTrendingUp } from "react-icons/hi2";
const UsersStats = ({ data }) => {
  return (
    <div className="w-full h-[111px] rounded-2xl relative p-4 flex flex-col justify-start items-start bg-white shadow ">
      <div className="w-full h-auto flex justify-between items-start">
        <div className="w-auto h-auto flex flex-col gap-2 justify-start  items-start">
          <p className="text-[#5b5b5b] text-sm font-medium">Total User</p>
          <h1 className="text-3xl font-bold">{data?.allusers}</h1>
        </div>
        <img src={UserStatsIcon} alt="user_stats" />
      </div>
    </div>
  );
};

export default UsersStats;

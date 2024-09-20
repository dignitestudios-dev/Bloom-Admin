import React from "react";
import UsersStats from "../../components/Dashboard/UsersStats";
import RevenueStats from "../../components/Dashboard/RevenueStats";
import PostsStats from "../../components/Dashboard/PostsStats";
import Users from "./Users";
import RevenueGraph from "../../components/Dashboard/RevenueGraph";
import BusinessMvr from "../../components/Dashboard/BusinessMvr";
import TransactionsTable from "../../components/Dashboard/TransactionsTable";

const Dashboard = () => {
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
      <div className="w-full grid grid-cols-2 gap-4">
        <UsersStats />
        {/* <RevenueStats /> */}
        <PostsStats />
      </div>
      <div className="w-full grid grid-cols-5 justify-start  items-start gap-4">
        <RevenueGraph />
        <BusinessMvr />
      </div>
      {/* <TransactionsTable /> */}
    </div>
  );
};

export default Dashboard;

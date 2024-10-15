import UsersStats from "../../components/Dashboard/UsersStats";
import RevenueStats from "../../components/Dashboard/RevenueStats";
import PostsStats from "../../components/Dashboard/PostsStats";
import Users from "./Users";
import RevenueGraph from "../../components/Dashboard/RevenueGraph";
import BusinessMvr from "../../components/Dashboard/BusinessMvr";
import TransactionsTable from "../../components/Dashboard/TransactionsTable";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
const Dashboard = () => {
  const { baseUrl, navigate, setError } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const [graph, setGraph] = useState(null);
  const [graphLoading, setGraphLoading] = useState(false);

  const [month, setMonth] = useState(new Date().getMonth());

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios.get(`${baseUrl}/admin/UsersAndPosts`, { headers }).then(
        (response) => {
          setData(response?.data?.data);
          setDataLoading(false);
        },
        (error) => {
          setError(error?.response?.data?.message);
          setDataLoading(false);
          if (error?.response?.status == 401) {
            Cookies.remove("token");
            navigate("Login", "/login");
          }
        }
      );
    } else {
      navigate("Login", "/login");
    }
  };

  const updateMonth = (month) => {
    setMonth(month);
  };

  const getGraphData = () => {
    const token = Cookies.get("token");

    if (token) {
      setGraphLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/admin/userByMonth?month=${month}`, {
          headers,
        })
        .then(
          (response) => {
            setGraph(response?.data?.data);
            setGraphLoading(false);
          },
          (error) => {
            setError(error?.response?.data?.message);
            setGraphLoading(false);
            if (error?.response?.status == 401) {
              Cookies.remove("token");
              navigate("Login", "/login");
            }
          }
        );
    } else {
      navigate("Login", "/login");
    }
  };
  useEffect(() => {
    getGraphData();
  }, [month]);

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
      <div className="w-full grid grid-cols-2 gap-4">
        <UsersStats data={data} />
        {/* <RevenueStats /> */}
        <PostsStats data={data} />
      </div>
      <div className="w-full grid grid-cols-5 justify-start  items-start gap-4">
        <RevenueGraph data={graph} updateMonth={updateMonth} />
        <BusinessMvr />
      </div>
      {/* <TransactionsTable /> */}
    </div>
  );
};

export default Dashboard;

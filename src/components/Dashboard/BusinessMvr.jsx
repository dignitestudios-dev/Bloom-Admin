import React, { useState, useContext, useEffect } from "react";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";

const BusinessMvr = () => {
  const { baseUrl, navigate, setError } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const getData = () => {
    const token = Cookies.get("token");

    if (token) {
      setDataLoading(true);
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`${baseUrl}/admin/catetoriesLikesAndComments`, { headers })
        .then(
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full p-4 h-[32rem] flex flex-col justify-start items-start col-span-2 shadow rounded-2xl shadow-gray-300">
      {/* <h2 className="text-xl font-bold text-gray-900">Category Statistics</h2> */}

      <div className="w-full border rounded-xl h-auto flex flex-col justify-start items-start">
        <div className="w-full px-3 h-12  grid grid-cols-5 justify-start items-center gap-4">
          <div className="w-6 h-6 rounded-full"></div>
          <h3 className="text-md font-bold col-span-2 text-gray-800  flex items-center justify-start">
            Category
          </h3>
          <h3 className="text-md font-medium text-gray-500   flex items-center justify-center">
            Likes
          </h3>
          <h3 className="text-md font-medium text-gray-500    flex items-center justify-center">
            Comments
          </h3>
        </div>
        {data?.map((item, key) => {
          return (
            <div
              key={key}
              className="w-full px-3 h-12 border-t grid grid-cols-5 justify-start items-center "
            >
              <div className="w-6 h-6 rounded-full bg-purple-500/50 border-purple-500 border"></div>
              <h3 className="text-md font-bold col-span-2 text-gray-800  flex items-center justify-start">
                {item?.categoryName}
              </h3>
              <h3 className="text-md font-medium text-gray-500  flex items-center justify-center">
                {item?.LikesCount}
              </h3>
              <h3 className="text-md font-medium text-gray-500  flex items-center justify-center">
                {item?.CommentsCount}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusinessMvr;

import React, { useContext, useEffect, useState } from "react";
import { TbFlagHeart } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Cookies from "js-cookie";
import Loader from "../../components/global/Loader";

const Users = () => {
  const { error, setError, baseUrl } = useContext(AppContext);
  const [userLoading, setUserLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  const [search, setSearch] = useState("");

  const getAllUsers = () => {
    setUserLoading(true);
    const headers = {
      Authorization: `Bearer ${Cookies.get("token")}`,
    };
    axios
      .get(`${baseUrl}/auth/allUser`, { headers })
      .then((response) => {
        setUsers(response?.data?.data);
        setUserLoading(false);
      })
      .catch((error) => {
        setUserLoading(false);
        setError(error?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, [reload]);

  const filteredData = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      user?.email?.toLowerCase().includes(search?.toLowerCase())
  );
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <div className="w-full h-12 flex justify-start items-center gap-2  relative">
        <input
          type="text"
          id="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="e.g. John Smith"
          className="mt-2 block w-full rounded-full border border-gray-200 px-3 h-12 shadow-sm outline-none focus:border-gradient focus:ring focus:ring-purple-200 focus:ring-opacity-50"
        />

        <button className="active:scale-95 absolute right-1 top-2 rounded-full bg-purple-500 px-8 h-10 font-medium text-white outline-none   hover:opacity-90">
          Search
        </button>
      </div>
      <div className="w-full overflow-x-auto rounded-xl grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 bg-white  ">
        {userLoading && (
          <div className="w-full col-span-4 h-[80vh] flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!userLoading && filteredData?.length > 0
          ? filteredData?.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-purple-500/10 flex justify-start items-center gap-2 rounded-xl p-3 border border-purple-200"
                >
                  <img
                    src={
                      data?.profilePicture
                        ? data?.profilePicture
                        : `https://eu.ui-avatars.com/api/?name=${data?.name}&size=250`
                    }
                    alt=""
                    className="w-10 h-10 rounded-lg"
                  />

                  <div className="w-auto flex flex-col justify-start items-start">
                    <span className="text-md font-medium text-gray-900">
                      {data?.name}
                    </span>
                    <p className="text-[10px] font-medium  text-gray-600">
                      {data?.email}
                    </p>
                  </div>
                </div>
              );
            })
          : !userLoading && (
              <div className="w-full col-span-4 h-[90vh] flex items-center justify-center">
                <img src="/no-data.jpg" alt="" className="h-96" />
              </div>
            )}
      </div>
    </div>
  );
};

export default Users;

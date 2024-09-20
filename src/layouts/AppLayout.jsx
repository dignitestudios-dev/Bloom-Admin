import React, { ReactNode, useContext, useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../context/AppContext";
import Success from "../components/global/Success";

const AppLayout = ({ page }) => {
  const { baseUrl, success, setSuccess } = useContext(AppContext);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const getProfile = () => {
    if (Cookies.get("token")) {
      const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
      };

      axios
        .get(`${baseUrl}/auth/adminProfile`, { headers })
        .then((response) => {
          setProfile(response?.data?.data);
          Cookies.set("name", response?.data?.data?.name);
          Cookies.set("email", response?.data?.data?.email);
          Cookies.set("profilePicture", response?.data?.data?.profilePicture);
          Cookies.set("id", response?.data?.data?.id);

          setProfileLoading(false);
        })
        .catch((error) => {
          setProfileLoading(false);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="w-full h-screen flex items-start justify-start">
      <Sidebar />
      {success && (
        <Success
          visibility={success}
          message={success}
          setVisibility={setSuccess}
        />
      )}
      <div className="w-[calc(100%-270px)] h-full flex flex-col justify-start items-start">
        <Navbar />
        <div className="w-full h-[calc(100%-3.5rem)]  overflow-x-hidden overflow-y-auto p-4">
          {page}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;

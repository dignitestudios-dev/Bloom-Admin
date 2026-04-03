import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  // const baseUrl = "https://backend.thebloom.co";
  // const baseUrl = "http://192.168.100.65:5000"; // CITS
  // const baseUrl =  "https://tw17qx2g-5000.inc1.devtunnels.ms";
  // const baseUrl = "http://3.23.170.13:4000";
  const baseUrl = "https://backend.thebloom.co";
  const push = useNavigate();
  const [activeLink, setActiveLink] = useState("Dashboard");
  const navigate = (name, url) => {
    push(url);
    setActiveLink(name);
  };
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [countuser, setCountuser] = useState([]);
  return (
    <AppContext.Provider
      value={{
        baseUrl,
        navigate,
        error,
        setError,
        activeLink,
        setActiveLink,
        success,
        setSuccess,countuser, setCountuser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

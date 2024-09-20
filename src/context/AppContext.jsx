import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
  const baseUrl = "https://backend.thebloom.co"; //SF
  // const baseUrl = "http://192.168.100.65:5000"; // CITS
  const push = useNavigate();
  const [activeLink, setActiveLink] = useState("Dashboard");
  const navigate = (name, url) => {
    push(url);
    setActiveLink(name);
  };
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  return (
    <AppContext.Provider
      value={{
        baseUrl,
        navigate,
        error,
        setError,
        activeLink,
        success,
        setSuccess,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

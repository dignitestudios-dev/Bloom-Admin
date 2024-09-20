import React, { useEffect } from "react";
import { Logo } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }, []);
  return (
    <div className="w-screen h-screen  overflow-hidden bg-gradient flex items-center justify-center relative">
      <img src={Logo} alt="logo" className="animate-to-bottom scale-125" />

      <h3 className="absolute text-md font-medium text-black bottom-4 animate-to-top">
        <span className="text-lg">&#169;</span>
        <span>2021 Sephora, USA. All Rights Reserved</span>
      </h3>
    </div>
  );
};

export default Splash;

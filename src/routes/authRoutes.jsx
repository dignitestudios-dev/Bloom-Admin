import ForgotPassword from "../pages/Authentication/ForgotPassword";
import Login from "../pages/Authentication/Login";
import UpdatePassword from "../pages/Authentication/UpdatePassword";
import VerifyOtp from "../pages/Authentication/VerifyOtp";

export const authRoutes = [
  {
    title: "Login",
    url: "/login",
    page: <Login />,
  },
  {
    title: "Forgot Password",
    url: "/forgot-password",
    page: <ForgotPassword />,
  },
  {
    title: "Verify OTP",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
  {
    title: "Update Password",
    url: "/update-password",
    page: <UpdatePassword />,
  },
];

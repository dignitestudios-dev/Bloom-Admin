import { Link, useNavigate } from "react-router-dom";
import { Flowers, Logo } from "../../assets/export";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import { verifyOtpValues } from "../../data/authentication";
import { verifytOtpSchema } from "../../schemas/verifyOtpSchema";
import BtnLoader from "../../components/global/BtnLoader";
import Error from "../../components/global/Error";
import Success from "../../components/global/Success";

const VerifyOtp = () => {
  const { baseUrl, navigate, setError, error, success, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: verifyOtpValues,
      validationSchema: verifytOtpSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        setLoading(true);
        const email = Cookies.get("email");

        axios
          .post(`${baseUrl}/auth/verifyotp`, {
            email: email,
            otp: values?.otp,
          })
          .then(
            (response) => {
              if (response) {
                console.log(response);
                Cookies.set("otp_token", response?.data?.token);
                navigate("Update Password", "/update-password");
                action.resetForm();
              }
              setLoading(false);
            },
            (error) => {
              setLoading(false);
              setError(error?.response?.data?.message);

              // setFormError(error?.response?.data?.message);
            }
          );
      },
    });

  const [resendLoading, setResendLoading] = useState(false);
  const resendOTP = (e) => {
    e.preventDefault();
    setResendLoading(true);

    axios
      .post(`${baseUrl}/auth/forgotpassword`, {
        email: Cookies.get("email"),
      })
      .then(
        (response) => {
          setSuccess("OTP Resend Successfully.");
          setResendLoading(false);
        },
        (error) => {
          setResendLoading(false);
          setError(error?.response?.data?.message);

          // setFormError(error?.response?.data?.message);
        }
      );
  };
  return (
    <div className="flex h-screen">
      {error && (
        <Error visibility={error} message={error} setVisibility={setError} />
      )}
      {success && (
        <Success
          visibility={success}
          message={success}
          setVisibility={setSuccess}
        />
      )}
      {/* <!-- Left Pane --> */}
      <div className="hidden lg:flex  items-center justify-center flex-1   text-black">
        <div className="w-full h-full  bg-white border-r flex items-center justify-center">
          <img src={Flowers} alt="mockup" className="w-[70%]" />
        </div>
      </div>
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-white lg:w-1/2 h-full relative flex flex-col items-center justify-center">
        <img src={Logo} alt="logo" className="absolute top-4" />
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-6 text-black text-center">
            Verify OTP?
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Enter the OTP we've sent you on {Cookies.get("email")}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <!-- Your form elements go here --> */}

            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP Code
              </label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                maxLength={6}
                className={`mt-1 h-12 px-3 text-left w-full border rounded-md focus:border-gray-200 ${
                  errors.otp && touched.otp ? "border-red-600 shake" : null
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300`}
              />
              {errors.otp && touched.otp ? (
                <p className="text-red-700 text-sm font-medium">{errors.otp}</p>
              ) : null}
            </div>

            <div className=" text-sm text-gray-800 font-medium text-center">
              <p>
                <button
                  onClick={resendOTP}
                  disabled={resendLoading}
                  type="button"
                  className=" hover:underline"
                >
                  {resendLoading ? "Sending" : "Resend OTP"}
                </button>
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg text-white p-2 h-12 mt-2 rounded-full  font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {loading ? <BtnLoader /> : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;

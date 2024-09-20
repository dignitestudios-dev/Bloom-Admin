import { Link, useNavigate } from "react-router-dom";
import { Flowers, Logo } from "../../assets/export";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../../context/AppContext";
import { verifyEmailValues } from "../../data/authentication";
import { verifyEmailSchema } from "../../schemas/verifyEmailSchema";
import { useContext, useState } from "react";
import BtnLoader from "../../components/global/BtnLoader";
import Error from "../../components/global/Error";

const ForgotPassword = () => {
  const { baseUrl, navigate, setError, error } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: verifyEmailValues,
      validationSchema: verifyEmailSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        setLoading(true);

        axios
          .post(`${baseUrl}/auth/forgotpassword`, {
            email: values?.email,
          })
          .then(
            (response) => {
              if (response) {
                Cookies.set("email", values?.email, { expires: 7 });
                navigate("Verify Otp", "/verify-otp");
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
  return (
    <div className="flex h-screen">
      {error && (
        <Error visibility={error} message={error} setVisibility={setError} />
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
            Forgot Password?
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            An OTP will be sent to the email that you're going to provide.
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <!-- Your form elements go here --> */}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 h-12 px-3 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.email && touched.email ? "border-red-600 shake" : null
                }`}
              />
              {errors.email && touched.email ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.email}
                </p>
              ) : null}
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

export default ForgotPassword;

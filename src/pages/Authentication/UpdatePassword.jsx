import { Link, useNavigate } from "react-router-dom";
import { Flowers, Logo } from "../../assets/export";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Error from "../../components/global/Error";
import { AppContext } from "../../context/AppContext";
import { useFormik } from "formik";
import {
  changePassValues,
  updatePasswordValues,
} from "../../data/authentication";
import { changePassSchema } from "../../schemas/changePassSchema";
import Cookies from "js-cookie";
import BtnLoader from "../../components/global/BtnLoader";

const UpdatePassword = () => {
  const { baseUrl, navigate, setError, error } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: changePassValues,
      validationSchema: changePassSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        const token = Cookies.get("otp_token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);

        axios
          .post(
            `${baseUrl}/auth/changepassword`,
            {
              newPassword: values?.newPassword,
            },
            { headers }
          )
          .then(
            (response) => {
              navigate("Login", "/login");
              action.resetForm();
              setLoading(false);
            },
            (error) => {
              setError(error?.response?.data?.message);
              setLoading(false);

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
      <div className="w-full bg-white lg:w-1/2 h-full relative flex items-center justify-center">
        <img src={Logo} alt="logo" className="absolute top-4" />
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-6 text-black text-center">
            Update Password
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Provide credentials to your account to access the dashboard{" "}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <!-- Your form elements go here --> */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="newPassword"
                className={`mt-1 px-3 h-12 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.newPassword && touched.newPassword
                    ? "border-red-600 shake"
                    : null
                }`}
              />
              {errors.newPassword && touched.newPassword ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.newPassword}
                </p>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 px-3 h-12 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.confirm_password && touched.confirm_password
                    ? "border-red-600 shake"
                    : null
                }`}
              />
              {errors.confirm_password && touched.confirm_password ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.confirm_password}
                </p>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg text-white p-2 h-12 mt-2 rounded-full  font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {loading ? <BtnLoader /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;

import { Link, useNavigate } from "react-router-dom";
import { Flowers, Logo } from "../../../assets/export";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Error from "../../../components/global/Error";
import { AppContext } from "../../../context/AppContext";
import { useFormik } from "formik";
import { updatePasswordValues } from "../../../data/authentication";
import Cookies from "js-cookie";
import BtnLoader from "../../../components/global/BtnLoader";
import { updatePassSchema } from "../../../schemas/updatePassSchema";

const ChangePassword = () => {
  const { baseUrl, navigate, setError, error, setSuccess } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: updatePasswordValues,
      validationSchema: updatePassSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        const token = Cookies.get("token");
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        setLoading(true);

        axios
          .post(
            `${baseUrl}/auth/changepassword`,
            {
              currentPassword: values.currentPassword,
              newPassword: values?.newPassword,
            },
            { headers }
          )
          .then(
            (response) => {
              setSuccess("Password reset successfully.");
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
    <div className="flex h-full">
      {/* <!-- Right Pane --> */}
      <div className="w-full bg-white lg:w-1/2 h-full relative flex items-center justify-center">
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-6 text-black text-center">
            Change Password
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Fill out this form to set your new password.{" "}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="currentPassword"
                className={`mt-1 px-3 h-12 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.currentPassword && touched.currentPassword
                    ? "border-red-600 shake"
                    : null
                }`}
              />
              {errors.currentPassword && touched.currentPassword ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.currentPassword}
                </p>
              ) : null}
            </div>
            {/* <!-- Your form elements go here --> */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
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
                htmlFor="confirmNewPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={values.confirmNewPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 px-3 h-12 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.confirmNewPassword && touched.confirmNewPassword
                    ? "border-red-600 shake"
                    : null
                }`}
              />
              {errors.confirmNewPassword && touched.confirmNewPassword ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.confirmNewPassword}
                </p>
              ) : null}
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white p-2 h-12 mt-2 rounded-full  font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {loading ? <BtnLoader /> : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <!-- Left Pane --> */}
      <div className="hidden lg:flex  items-center justify-center flex-1   text-black">
        <div className="w-full h-full  bg-purple-500/10 rounded-3xl flex items-center justify-center">
          <img src={Flowers} alt="mockup" className="w-[70%]" />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

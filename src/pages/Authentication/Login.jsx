import { Link, useNavigate } from "react-router-dom";
import { Flowers, Logo } from "../../assets/export";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { signInSchema } from "../../schemas/signInSchema";
import { login } from "../../api/login";
import { loginValues } from "../../data/authentication";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import BtnLoader from "../../components/global/BtnLoader";
import Error from "../../components/global/Error";

const Login = () => {
  const { baseUrl, navigate, setError, error } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginValues,
      validationSchema: signInSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: async (values, action) => {
        setLoading(true);
        axios
          .post(`${baseUrl}/auth/signin`, {
            email: values?.email,
            password: values?.password,
            role: "admin",
            fcmToken: "shfdkjhafkjhsakjhfds",
          })
          .then(
            (response) => {
              if (response?.data?.data?.token) {
                Cookies.set("token", response?.data?.data?.token, {
                  expires: 7,
                });
                navigate("Dashboard", "/dashboard");
                action.resetForm();
              }
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

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("Dashboard", "/dashboard");
    } else {
      return;
    }
  }, []);

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
        {/* <img src={Logo} alt="logo" className="absolute top-4" /> */}
        <div className="max-w-md w-full p-6">
          <h1 className="text-4xl font-bold mb-6 text-black text-center">
            Log in
          </h1>
          <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
            Provide credentials to your account to access the dashboard{" "}
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
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`mt-1 px-3 h-12 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300 ${
                  errors.password && touched.password
                    ? "border-red-600 shake"
                    : null
                }`}
              />
              {errors.password && touched.password ? (
                <p className="text-red-700 text-sm font-medium">
                  {errors.password}
                </p>
              ) : null}
            </div>
            <div className=" text-sm text-gray-800 font-medium text-center">
              <p>
                <Link to="/forgot-password" className=" hover:underline">
                  Forgot Password
                </Link>
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg text-white p-2 h-12 mt-2 rounded-full  font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300"
              >
                {loading ? <BtnLoader /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

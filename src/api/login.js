import axios from "axios";
import Cookies from "js-cookie";
import { AppContext } from "../context/AppContext";

export async function login(email, password, url, navigate, setLoading) {
  axios
    .post(`${url}/auth/signin`, {
      email: email,
      password: password,
      role: "admin",
    })
    .then(
      (response) => {
        console.log(response);
        if (response?.data?.token) {
          Cookies.set("token", response?.data?.token, { expires: 7 });
          navigate("/dashboard", "Dashboard");
        }
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return error;

        // setFormError(error?.response?.data?.message);
      }
    );
}

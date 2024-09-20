import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export class Authenticate {
  login(e, email, password, role) {
    e.preventDefault();
    axios
      .post(`${baseUrl}/auth/emailSignIn`, {
        email: email,
        password: password,
        role: role,
      })
      .then(
        (response) => {
          if (response?.data?.token) {
            Cookies.set("token", response?.data?.token, { expires: 7 });
            navigate("/dashboard", "Dashboard");
          }
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          setFormError(error?.response?.data?.message);
        }
      );
  }
}
